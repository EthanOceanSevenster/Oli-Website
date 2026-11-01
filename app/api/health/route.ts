import { sql } from 'drizzle-orm';

import { db, usingPglite } from '@/lib/db';
import { json } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Liveness plus a real database round trip, so a deploy with an unreachable
 * or unmigrated database fails this check instead of only failing for users.
 */
export async function GET() {
  const startedAt = Date.now();

  try {
    await db.execute(sql`select 1`);
  } catch (error) {
    return json(
      {
        status: 'degraded',
        database: 'unreachable',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 503 },
    );
  }

  return json({
    status: 'ok',
    database: usingPglite ? 'pglite (local, not durable)' : 'postgres',
    latencyMs: Date.now() - startedAt,
  });
}
