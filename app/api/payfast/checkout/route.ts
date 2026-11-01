import { z } from 'zod';

import { getCurrentLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { payments } from '@/lib/db/schema';
import { fail, json, publicOrigin, readJson, requireSameOrigin } from '@/lib/http';
import { PRICING, checkoutFields, payfastConfig } from '@/lib/payfast';
import { firstError } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ plan: z.enum(['monthly', 'annual']) });

/**
 * Starts a Payfast checkout.
 *
 * Returns the hidden fields for a form the browser POSTs to Payfast. Nothing
 * here grants access — the payment row is only `pending` until Payfast tells
 * us otherwise over the ITN callback.
 */
export async function POST(request: Request) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;

  const learner = await getCurrentLearner();
  if (!learner) return fail('Sign in first.', 401);

  const body = await readJson(request);
  if (!body) return fail('Send a JSON object.');

  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error));

  const config = payfastConfig();
  if (!config) {
    // Not set up yet. The prototype's simulated checkout stands in.
    return json({ configured: false, error: 'Payments are not configured.' }, { status: 503 });
  }

  const { plan } = parsed.data;

  const [payment] = await db
    .insert(payments)
    .values({
      learnerId: learner.id,
      plan,
      amount: PRICING[plan].amount,
      recurring: PRICING[plan].recurring,
    })
    .returning();

  let fields: Record<string, string>;
  try {
    fields = checkoutFields({
      config,
      origin: publicOrigin(request),
      paymentId: payment!.id,
      plan,
      firstName: learner.firstName,
      lastName: learner.lastName,
      email: learner.email,
    });
  } catch (error) {
    // A misconfiguration, not the learner's problem — say so in the log and
    // keep the message to them vague.
    console.error('[payfast/checkout]', error);
    return json(
      { configured: false, error: 'This plan cannot be paid for right now. Please try again later.' },
      { status: 503 },
    );
  }

  return json({
    configured: true,
    sandbox: config.sandbox,
    paymentId: payment!.id,
    action: config.processUrl,
    fields,
  });
}
