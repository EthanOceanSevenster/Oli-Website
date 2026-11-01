/**
 * Loads the 24 institutions the prototype ships with.
 *
 * Two files feed one row each: the directory record the front end renders, and
 * the Applications Hub record carrying the verification status and the date
 * each institution was last checked against its official website.
 *
 * Idempotent — matches on the institution code, so re-running updates rather
 * than duplicates. Pass --keep-verification to leave hand-corrected statuses
 * alone on rows that already exist.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { sql } from 'drizzle-orm';

import { db } from './index';
import { universities } from './schema';

type Verification = 'verified' | 'partial' | 'review';

type DirectoryRecord = {
  id: string;
  name?: string;
  abbr?: string;
  site?: string | null;
  location?: string | null;
  dataYear?: number | null;
};

type HubRecord = {
  id: string;
  status?: string;
  lastVerified?: string | null;
  intakeYear?: number | null;
  campuses?: string[] | null;
};

const DATA_DIR = path.join(process.cwd(), 'data');

function toVerification(status: string | undefined): Verification {
  return status === 'verified' || status === 'partial' ? status : 'review';
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(path.join(DATA_DIR, file), 'utf8')) as T;
}

async function main() {
  const keepVerification = process.argv.includes('--keep-verification');

  const directory = await readJson<DirectoryRecord[]>('universities.json');
  const hubRecords = await readJson<HubRecord[]>('applications-hub.json');
  const hub = new Map(hubRecords.map((record) => [record.id, record]));

  const rows = directory.map((record) => {
    const extra = hub.get(record.id) ?? ({} as HubRecord);
    const campuses = extra.campuses ?? [];

    return {
      code: record.id,
      name: record.name ?? '',
      abbr: record.abbr ?? '',
      site: record.site ?? '',
      location: record.location ?? campuses.slice(0, 3).join(', '),
      dataYear: record.dataYear ?? extra.intakeYear ?? null,
      verification: toVerification(extra.status),
      lastChecked: extra.lastVerified ?? null,
      payload: record as Record<string, unknown>,
      updatedAt: new Date(),
    };
  });

  for (const row of rows) {
    const set: Record<string, unknown> = {
      name: row.name,
      abbr: row.abbr,
      site: row.site,
      location: row.location,
      dataYear: row.dataYear,
      payload: row.payload,
      updatedAt: row.updatedAt,
    };

    if (!keepVerification) {
      set.verification = row.verification;
      set.lastChecked = row.lastChecked;
    }

    await db.insert(universities).values(row).onConflictDoUpdate({
      target: universities.code,
      set,
    });
  }

  const [counts] = await db
    .select({
      total: sql<number>`count(*)::int`,
      partial: sql<number>`count(*) filter (where ${universities.verification} = 'partial')::int`,
      review: sql<number>`count(*) filter (where ${universities.verification} = 'review')::int`,
      verified: sql<number>`count(*) filter (where ${universities.verification} = 'verified')::int`,
    })
    .from(universities);

  console.log(
    `Seeded ${rows.length} universities. In the database: ${counts!.total} total — ` +
      `${counts!.verified} verified, ${counts!.partial} partially verified, ${counts!.review} need review.`,
  );
  console.log(
    'Deadlines, fees and links in this data are not fully verified. ' +
      'See section 4 of docs/PROTOTYPE_HANDOVER.md before publishing any of it.',
  );

  process.exit(0);
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
