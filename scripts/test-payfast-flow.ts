/**
 * Drives the ITN callback end to end against a throwaway database.
 *
 *   npx tsx scripts/test-payfast-flow.ts
 *
 * The callback is the only thing in the codebase that grants paid access, so
 * what matters is not just that a good notification works but that every bad
 * one is refused. This calls the real route handler, with Payfast's own
 * confirmation step stubbed — that call goes out to Payfast over a connection
 * we open, and a notification invented here is one they have never heard of.
 * Everything else is the real thing, against a real Postgres.
 */

import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

process.env.PAYFAST_SANDBOX = 'true';
process.env.PGLITE_PATH = mkdtempSync(join(tmpdir(), 'pathway-payfast-'));
delete process.env.DATABASE_URL;

async function run() {
  const { createHash } = await import('node:crypto');
  const { eq } = await import('drizzle-orm');
  const { migrate } = await import('drizzle-orm/pglite/migrator');

  const { db } = await import('../lib/db');
  const { learners, paymentEvents, payments } = await import('../lib/db/schema');
  const { hashPassword } = await import('../lib/auth');
  const { payfastConfig } = await import('../lib/payfast');
  const { POST: notify } = await import('../app/api/payfast/notify/route');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await migrate(db as any, { migrationsFolder: './drizzle' });

  const config = payfastConfig()!;
  const md5 = (v: string) => createHash('md5').update(v).digest('hex');
  const php = (v: string) =>
    encodeURIComponent(v)
      .replace(/[!'()*~]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
      .replace(/%20/g, '+');

  let passed = 0;
  const failures: string[] = [];
  const check = (label: string, ok: boolean, detail?: unknown) => {
    if (ok) {
      passed += 1;
      console.log(`  PASS  ${label}`);
    } else {
      failures.push(label);
      console.log(`  FAIL  ${label}${detail === undefined ? '' : `  -- ${JSON.stringify(detail)}`}`);
    }
  };

  /* Payfast's confirmation call is the one thing we cannot do for real here. */
  const realFetch = globalThis.fetch;
  let confirmVerdict = 'VALID';
  let confirmCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.includes('/eng/query/validate')) {
      confirmCalls += 1;
      return new Response(confirmVerdict, { status: 200 });
    }
    return realFetch(input as never, init);
  }) as typeof fetch;

  /** Signs a notification body the way Payfast's server does. */
  function body(fields: Record<string, string>, passphrase = config.passphrase): string {
    const base = Object.entries(fields)
      .map(([k, v]) => `${k}=${php(v)}`)
      .join('&');
    return `${base}&signature=${md5(passphrase ? `${base}&passphrase=${php(passphrase)}` : base)}`;
  }

  /** Posts a notification at the real route handler. */
  async function send(raw: string, ip = '197.97.145.150') {
    return notify(
      new Request('https://pathwayexplore.com/api/payfast/notify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'x-forwarded-for': ip },
        body: raw,
      }),
    );
  }

  async function freshLearner(email: string, plan: 'monthly' | 'annual') {
    const [learner] = await db
      .insert(learners)
      .values({ email, passwordHash: await hashPassword('PathwayLive2026'), grade: '11' })
      .returning();
    const [payment] = await db
      .insert(payments)
      .values({
        learnerId: learner!.id,
        plan,
        amount: plan === 'annual' ? '199.00' : '20.00',
        recurring: plan === 'monthly',
      })
      .returning();
    return { learner: learner!, payment: payment! };
  }

  const reload = async (id: string) =>
    (await db.select().from(learners).where(eq(learners.id, id)).limit(1))[0]!;
  const reloadPayment = async (id: string) =>
    (await db.select().from(payments).where(eq(payments.id, id)).limit(1))[0]!;

  // Payfast's own transaction id is unique across their whole system, which
  // is what lets it be the primary key that makes the callback idempotent.
  let pfCounter = 900_000;

  function itn(paymentId: string, overrides: Record<string, string> = {}) {
    return {
      m_payment_id: paymentId,
      pf_payment_id: String((pfCounter += 1)),
      payment_status: 'COMPLETE',
      item_name: 'PATHWAY Annual',
      amount_gross: '199.00',
      amount_fee: '-9.55',
      amount_net: '189.45',
      custom_str1: 'annual',
      name_first: 'Thandeka',
      name_last: 'Ngcobo',
      email_address: 'learner@example.com',
      merchant_id: config.merchantId,
      ...overrides,
    };
  }

  /* ------------------------------------------------- the happy path -- */

  console.log('\nA PAYMENT THAT WENT THROUGH');

  {
    const { learner, payment } = await freshLearner('annual@flow.test', 'annual');
    const before = await reload(learner.id);
    check('a new account has no access', before.plan === 'none' && before.planExpires === null);

    const notification = body(itn(payment.id));
    const response = await send(notification);
    check('Payfast gets a 200', response.status === 200, response.status);
    check('we asked Payfast to confirm it', confirmCalls === 1, confirmCalls);

    const after = await reload(learner.id);
    check('the plan is recorded', after.plan === 'annual', after.plan);

    const days = after.planExpires
      ? Math.round((after.planExpires.getTime() - Date.now()) / 86_400_000)
      : 0;
    check('access runs for a year', days === 365, days);
    check('the payment is marked complete', (await reloadPayment(payment.id)).state === 'complete');

    const events = await db.select().from(paymentEvents).where(eq(paymentEvents.paymentId, payment.id));
    check('the notification is kept as a record', events.length === 1, events.length);
    check('the amount is kept with it', events[0]?.amountGross === '199.00', events[0]?.amountGross);

    // Payfast retries until it gets a 200, so the same one can arrive twice.
    await send(notification);
    const replayed = await reload(learner.id);
    check(
      'a repeat of the same notification does not extend access again',
      replayed.planExpires?.getTime() === after.planExpires?.getTime(),
    );
    check(
      'and does not record a second payment',
      (await db.select().from(paymentEvents).where(eq(paymentEvents.paymentId, payment.id))).length === 1,
    );
  }

  /* ------------------------------------------------------ renewals -- */

  console.log('\nA MONTHLY SUBSCRIPTION RENEWING');

  {
    const { learner, payment } = await freshLearner('monthly@flow.test', 'monthly');
    const first = itn(payment.id, {
      pf_payment_id: '900100',
      amount_gross: '20.00',
      item_name: 'PATHWAY Monthly',
      custom_str1: 'monthly',
      token: 'f1e2d3c4-0000-1111-2222-333344445555',
    });
    await send(body(first));

    const afterFirst = await reload(learner.id);
    const firstExpiry = afterFirst.planExpires!.getTime();
    check('the first month is granted', afterFirst.plan === 'monthly');
    check(
      'it runs about a month',
      Math.round((firstExpiry - Date.now()) / 86_400_000) === 31,
      Math.round((firstExpiry - Date.now()) / 86_400_000),
    );
    check(
      'the subscription token is kept, so it can be cancelled later',
      (await reloadPayment(payment.id)).token === 'f1e2d3c4-0000-1111-2222-333344445555',
    );

    // Next cycle: same payment, a new notification id.
    await send(body({ ...first, pf_payment_id: '900101' }));
    const afterSecond = await reload(learner.id);
    check(
      'the next cycle adds another month rather than restarting the clock',
      Math.round((afterSecond.planExpires!.getTime() - firstExpiry) / 86_400_000) === 31,
      Math.round((afterSecond.planExpires!.getTime() - firstExpiry) / 86_400_000),
    );

    // Cancelling keeps what was already paid for.
    await send(body({ ...first, pf_payment_id: '900102', payment_status: 'CANCELLED' }));
    const afterCancel = await reload(learner.id);
    check(
      'cancelling does not take back time already paid for',
      afterCancel.planExpires?.getTime() === afterSecond.planExpires?.getTime(),
    );
    check('the payment is marked cancelled', (await reloadPayment(payment.id)).state === 'cancelled');
  }

  /* -------------------------------------------- notifications to refuse -- */

  console.log('\nNOTIFICATIONS THAT MUST NOT GRANT ANYTHING');

  const refusals: Array<[string, (id: string) => string, string?]> = [
    [
      'a signature that does not match',
      (id) => body(itn(id)).replace(/signature=.*$/, 'signature=' + 'a'.repeat(32)),
    ],
    [
      'a notification signed with the wrong passphrase',
      (id) => body(itn(id), 'not-our-passphrase'),
    ],
    ['no signature at all', (id) => body(itn(id)).replace(/&signature=.*$/, '')],
    [
      'an amount larger than we quoted',
      (id) => body(itn(id, { amount_gross: '1.00' })),
    ],
    [
      'an amount smaller than we quoted',
      (id) => body(itn(id, { amount_gross: '0.01' })),
    ],
    [
      'a notification for somebody else’s merchant account',
      (id) => body(itn(id, { merchant_id: '99999999' })),
    ],
    ['an empty body', () => ''],
    ['a payment we never started', () => body(itn('00000000-0000-0000-0000-000000000000'))],
  ];

  for (const [label, make] of refusals) {
    const { learner, payment } = await freshLearner(`refuse-${failures.length}-${passed}@flow.test`, 'annual');
    const response = await send(make(payment.id));
    const after = await reload(learner.id);
    check(
      `${label} grants nothing`,
      after.plan === 'none' && after.planExpires === null && response.status === 200,
      { plan: after.plan, status: response.status },
    );
  }

  {
    const { learner, payment } = await freshLearner('badip@flow.test', 'annual');
    process.env.PAYFAST_SANDBOX = 'false';
    process.env.PAYFAST_MERCHANT_ID = config.merchantId;
    process.env.PAYFAST_MERCHANT_KEY = config.merchantKey;
    process.env.PAYFAST_PASSPHRASE = config.passphrase;
    const notification = body(itn(payment.id));
    await send(notification, '8.8.8.8');
    check('a notification from a stranger’s IP grants nothing', (await reload(learner.id)).plan === 'none');

    await send(notification, '197.97.145.150');
    check('the same notification from a Payfast IP is accepted', (await reload(learner.id)).plan === 'annual');
    check('the payment settled', (await reloadPayment(payment.id)).state === 'complete');
    process.env.PAYFAST_SANDBOX = 'true';
    delete process.env.PAYFAST_MERCHANT_ID;
    delete process.env.PAYFAST_MERCHANT_KEY;
    delete process.env.PAYFAST_PASSPHRASE;
  }

  {
    const { learner, payment } = await freshLearner('unconfirmed@flow.test', 'annual');
    confirmVerdict = 'INVALID';
    await send(body(itn(payment.id)));
    check(
      'a notification Payfast will not vouch for grants nothing',
      (await reload(learner.id)).plan === 'none',
    );
    confirmVerdict = 'VALID';
  }

  console.log('\n' + '='.repeat(60));
  if (failures.length) {
    console.log(`${failures.length} FAILED, ${passed} passed`);
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
  console.log(`All ${passed} checks passed.`);
  process.exit(0);
}

run().catch((error) => {
  console.error('Test run crashed:', error);
  process.exit(1);
});

export {};
