import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { learners, paymentEvents, payments } from '@/lib/db/schema';
import { clientIp } from '@/lib/http';
import {
  PRICING,
  confirmWithPayfast,
  isPayfastIp,
  itnField,
  parseItn,
  payfastConfig,
  verifyItnSignature,
} from '@/lib/payfast';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Payfast's ITN callback — the only thing in this codebase that grants paid
 * access.
 *
 * Four checks, all of which must pass before a cent is believed:
 *   1. the signature matches, which takes the passphrase to produce;
 *   2. the notification came from a Payfast IP;
 *   3. the amount equals what we quoted for that payment, from our own row;
 *   4. Payfast itself confirms it sent this, over a connection we opened.
 *
 * Status codes matter here. Payfast retries anything that is not a 200, so a
 * notification we have *decided* about — genuine or forged — gets a 200, and
 * only a transient failure on our side returns 500 to ask for the retry.
 */

/** A response body is a stream that can only be read once, so never share one. */
const ACCEPTED = () => new Response('OK', { status: 200 });
const RETRY = () => new Response('Temporary failure', { status: 500 });

function log(message: string, detail?: unknown) {
  console.warn(`[payfast/notify] ${message}`, detail ?? '');
}

export async function POST(request: Request) {
  const config = payfastConfig();
  if (!config) {
    log('notification arrived but Payfast is not configured');
    return ACCEPTED();
  }

  const raw = await request.text();
  const pairs = parseItn(raw);
  const field = (name: string) => itnField(pairs, name);

  // 1. Signature.
  if (!verifyItnSignature(raw, pairs, config.passphrase)) {
    log('rejected: signature mismatch', { m_payment_id: field('m_payment_id') });
    return ACCEPTED();
  }

  // 2. Source address. Payfast's sandbox does not always answer from the
  //    published ranges, so there it is recorded rather than enforced — the
  //    other three checks still have to pass either way.
  const ip = clientIp(request);
  if (!isPayfastIp(ip)) {
    if (!config.sandbox) {
      log('rejected: source IP is not Payfast', { ip });
      return ACCEPTED();
    }
    log('sandbox: accepting an unlisted source IP', { ip });
  }

  if (field('merchant_id') !== config.merchantId) {
    log('rejected: merchant_id is not ours', { merchant_id: field('merchant_id') });
    return ACCEPTED();
  }

  const paymentId = field('m_payment_id');
  if (!/^[0-9a-f-]{36}$/i.test(paymentId)) {
    log('rejected: unusable m_payment_id', { paymentId });
    return ACCEPTED();
  }

  try {
    const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
    if (!payment) {
      log('rejected: no such payment', { paymentId });
      return ACCEPTED();
    }

    const status = field('payment_status').toUpperCase();
    const gross = field('amount_gross');

    // 3. Amount, against the price we quoted rather than anything posted.
    if (status === 'COMPLETE') {
      const expected = Number(payment.amount);
      if (!Number.isFinite(Number(gross)) || Math.abs(Number(gross) - expected) > 0.009) {
        log('rejected: amount does not match', { paymentId, gross, expected });
        return ACCEPTED();
      }
    }

    // 4. Payfast's own confirmation, on a connection we opened to a host we
    //    chose — so a forged notification cannot vouch for itself.
    const confirmation = raw
      .split('&')
      .filter((pair) => !pair.startsWith('signature='))
      .join('&');

    if (!(await confirmWithPayfast(config, confirmation))) {
      log('rejected: Payfast did not confirm the notification', { paymentId });
      return ACCEPTED();
    }

    // Idempotency. Payfast retries, and a monthly subscription notifies every
    // cycle against this same payment, so the notification's own id is what
    // decides whether this one has already been acted on.
    const pfPaymentId = field('pf_payment_id') || `${paymentId}:${status}`;
    const inserted = await db
      .insert(paymentEvents)
      .values({
        pfPaymentId,
        paymentId: payment.id,
        status,
        amountGross: /^-?[0-9]+(\.[0-9]+)?$/.test(gross) ? gross : null,
        payload: Object.fromEntries(pairs),
      })
      .onConflictDoNothing()
      .returning();

    if (inserted.length === 0) return ACCEPTED(); // already handled

    const token = field('token');

    if (status !== 'COMPLETE') {
      // A cancelled subscription keeps the time it has already paid for, so
      // only the payment's own state changes here.
      await db
        .update(payments)
        .set({
          state: status === 'CANCELLED' ? 'cancelled' : 'failed',
          token: token || payment.token,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, payment.id));
      return ACCEPTED();
    }

    const [learner] = await db
      .select()
      .from(learners)
      .where(eq(learners.id, payment.learnerId))
      .limit(1);
    if (!learner) {
      log('payment confirmed but the learner is gone', { paymentId });
      return ACCEPTED();
    }

    const price = payment.plan === 'monthly' || payment.plan === 'annual' ? PRICING[payment.plan] : null;
    if (!price) {
      log('payment confirmed against a plan with no price', { paymentId, plan: payment.plan });
      return ACCEPTED();
    }

    // Extend from whichever is later, so a renewal that arrives early adds to
    // the term instead of shortening it.
    const now = new Date();
    const from = learner.planExpires && learner.planExpires > now ? learner.planExpires : now;
    const expires = new Date(from.getTime() + price.days * 86_400_000);

    await db
      .update(learners)
      .set({ plan: payment.plan, planExpires: expires, updatedAt: now })
      .where(eq(learners.id, learner.id));

    await db
      .update(payments)
      .set({ state: 'complete', token: token || payment.token, updatedAt: now })
      .where(eq(payments.id, payment.id));

    return ACCEPTED();
  } catch (error) {
    // Our fault, not theirs: ask Payfast to send it again.
    log('failed while recording a notification', error);
    return RETRY();
  }
}
