import { and, eq } from 'drizzle-orm';

import { getCurrentLearner, publicLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { payments } from '@/lib/db/schema';
import { fail, json } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Where a payment got to, for the pay page to poll while the ITN is in
 * flight. Scoped to the signed-in learner, so one account cannot read
 * another's payments.
 */
export async function GET(request: Request) {
  const learner = await getCurrentLearner();
  if (!learner) return fail('Sign in first.', 401);

  const id = new URL(request.url).searchParams.get('id') ?? '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return fail('Unknown payment.', 404);

  const [payment] = await db
    .select()
    .from(payments)
    .where(and(eq(payments.id, id), eq(payments.learnerId, learner.id)))
    .limit(1);

  if (!payment) return fail('Unknown payment.', 404);

  return json({
    state: payment.state,
    plan: payment.plan,
    learner: publicLearner(learner),
  });
}
