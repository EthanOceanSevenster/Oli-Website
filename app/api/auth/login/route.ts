import { eq } from 'drizzle-orm';

import { createSession, hashPassword, publicLearner, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { learners } from '@/lib/db/schema';
import { fail, guardCredentials, json, readJson, requireSameOrigin } from '@/lib/http';
import { firstError, loginSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Hashing a throwaway password when the account does not exist keeps the
 * response time of "no such learner" and "wrong password" roughly equal, so
 * the endpoint does not quietly confirm which addresses are registered.
 */
async function burnTime(password: string) {
  await hashPassword(password);
}

export async function POST(request: Request) {
  const blocked = requireSameOrigin(request) ?? guardCredentials(request, 'login');
  if (blocked) return blocked;

  const body = await readJson(request);
  if (!body) return fail('Send a JSON object.');

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error));

  const { email, password } = parsed.data;

  const [learner] = await db.select().from(learners).where(eq(learners.email, email)).limit(1);

  if (!learner) {
    await burnTime(password);
    return fail('That email address and password do not match.', 401);
  }

  if (!(await verifyPassword(password, learner.passwordHash))) {
    return fail('That email address and password do not match.', 401);
  }

  await createSession(learner.id);
  return json({ learner: publicLearner(learner) });
}
