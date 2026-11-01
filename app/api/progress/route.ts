import { eq } from 'drizzle-orm';

import { getCurrentLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { progress } from '@/lib/db/schema';
import { fail, json, readJson, requireSameOrigin } from '@/lib/http';
import { firstError, progressSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Roughly the largest blob a learner journey should ever produce. */
const MAX_BLOB_BYTES = 1_000_000;

export async function GET() {
  const learner = await getCurrentLearner();
  if (!learner) return fail('Sign in first.', 401);

  const [row] = await db
    .select()
    .from(progress)
    .where(eq(progress.learnerId, learner.id))
    .limit(1);

  if (!row) {
    const now = new Date();
    await db.insert(progress).values({ learnerId: learner.id, data: {}, updatedAt: now });
    return json({ data: {}, updatedAt: now.toISOString() });
  }

  return json({ data: row.data, updatedAt: row.updatedAt.toISOString() });
}

export async function PUT(request: Request) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;

  const learner = await getCurrentLearner();
  if (!learner) return fail('Sign in first.', 401);

  const body = await readJson(request);
  if (!body) return fail('Send a JSON object.');

  const parsed = progressSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error));

  const { data } = parsed.data;

  if (JSON.stringify(data).length > MAX_BLOB_BYTES) {
    return fail('That progress payload is too large.', 413);
  }

  const updatedAt = new Date();

  await db
    .insert(progress)
    .values({ learnerId: learner.id, data, updatedAt })
    .onConflictDoUpdate({
      target: progress.learnerId,
      set: { data, updatedAt },
    });

  return json({ saved: true, updatedAt: updatedAt.toISOString() });
}
