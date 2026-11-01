/**
 * Applies the generated SQL migrations.
 *
 * Run against production once per deploy that changes the schema:
 *   DATABASE_URL="postgres://..." npm run db:migrate
 */
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import { migrate as migratePostgres } from 'drizzle-orm/postgres-js/migrator';

import { db, usingPglite } from './index';

const MIGRATIONS_FOLDER = './drizzle';

async function main() {
  const target = usingPglite ? `PGlite (local)` : 'Postgres';
  console.log(`Applying migrations to ${target} ...`);

  if (usingPglite) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await migratePglite(db as any, { migrationsFolder: MIGRATIONS_FOLDER });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await migratePostgres(db as any, { migrationsFolder: MIGRATIONS_FOLDER });
  }

  console.log('Migrations applied.');
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
