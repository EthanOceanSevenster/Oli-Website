import { asc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';

import { db } from '@/lib/db';
import { universities } from '@/lib/db/schema';
import { fail, json } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VERIFICATION = ['verified', 'partial', 'review'] as const;
type Verification = (typeof VERIFICATION)[number];

const summary = {
  id: universities.code,
  name: universities.name,
  abbr: universities.abbr,
  site: universities.site,
  location: universities.location,
  dataYear: universities.dataYear,
  verification: universities.verification,
  lastChecked: universities.lastChecked,
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const filters: SQL[] = [];

  const query = params.get('q')?.trim();
  if (query) {
    const term = `%${query.replace(/[%_]/g, (c) => `\\${c}`)}%`;
    filters.push(or(ilike(universities.name, term), ilike(universities.abbr, term))!);
  }

  const verification = params.get('verification')?.trim();
  if (verification) {
    if (!VERIFICATION.includes(verification as Verification)) {
      return fail(`verification must be one of: ${VERIFICATION.join(', ')}.`);
    }
    filters.push(eq(universities.verification, verification as Verification));
  }

  const where = filters.length ? sql.join(filters, sql` and `) : undefined;

  const results = await db
    .select(summary)
    .from(universities)
    .where(where)
    .orderBy(asc(universities.name));

  return json({ results, count: results.length });
}
