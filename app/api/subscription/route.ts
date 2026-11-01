import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getCurrentLearner, publicLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { learners } from '@/lib/db/schema';
import { fail, json, readJson, requireSameOrigin } from '@/lib/http';
import { firstError } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ plan: z.enum(['monthly', 'annual']) });

const TERM_DAYS = { monthly: 31, annual: 365 } as const;

/**
 * Records the plan a learner chose.
 *
 * Checkout is still simulated — the prototype takes a test card and no money
 * moves. This only persists which plan was selected and until when, so access
 * survives a new device. Replace the call site with a real payment provider's
 * webhook before launch; this endpoint must not be what grants paid access.
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

  const { plan } = parsed.data;
  const expires = new Date(Date.now() + TERM_DAYS[plan] * 24 * 60 * 60 * 1000);

  const [updated] = await db
    .update(learners)
    .set({ plan, planExpires: expires, updatedAt: new Date() })
    .where(eq(learners.id, learner.id))
    .returning();

  return json({ learner: publicLearner(updated!), simulated: true });
}
