import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { universities } from '@/lib/db/schema';
import { fail, json } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const [university] = await db
    .select()
    .from(universities)
    .where(eq(universities.code, code.toLowerCase()))
    .limit(1);

  if (!university) return fail('No university with that code.', 404);

  return json({
    id: university.code,
    name: university.name,
    abbr: university.abbr,
    site: university.site,
    location: university.location,
    dataYear: university.dataYear,
    verification: university.verification,
    lastChecked: university.lastChecked,
    payload: university.payload,
  });
}
