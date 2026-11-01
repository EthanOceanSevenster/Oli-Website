import { eq } from 'drizzle-orm';

import { createSession, hashPassword, publicLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { learners, progress } from '@/lib/db/schema';
import { fail, guardCredentials, json, readJson, requireSameOrigin } from '@/lib/http';
import { firstError, registerSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const blocked = requireSameOrigin(request) ?? guardCredentials(request, 'register');
  if (blocked) return blocked;

  const body = await readJson(request);
  if (!body) return fail('Send a JSON object.');

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error));

  const { email, password, firstName, lastName, grade, dateOfBirth } = parsed.data;

  const [existing] = await db
    .select({ id: learners.id })
    .from(learners)
    .where(eq(learners.email, email))
    .limit(1);

  if (existing) return fail('An account already exists for that email address.', 409);

  const passwordHash = await hashPassword(password);

  try {
    const learner = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(learners)
        .values({
          email,
          passwordHash,
          firstName,
          lastName,
          grade: grade ?? null,
          dateOfBirth: dateOfBirth ?? null,
        })
        .returning();

      await tx.insert(progress).values({ learnerId: created!.id, data: {} });
      return created!;
    });

    await createSession(learner.id);
    return json({ learner: publicLearner(learner) }, { status: 201 });
  } catch (error) {
    // The unique index is the real guard — two requests can pass the check above.
    if (String(error).includes('learners_email_unique') || String(error).includes('duplicate key')) {
      return fail('An account already exists for that email address.', 409);
    }
    throw error;
  }
}
