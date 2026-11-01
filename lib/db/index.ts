import { createRequire } from 'node:module';

import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { drizzle as drizzlePostgres, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

export type Database = PostgresJsDatabase<typeof schema>;

/**
 * Production runs on Postgres over DATABASE_URL.
 *
 * Without one, we fall back to PGlite — real Postgres compiled to WebAssembly,
 * running in-process against a file under .pglite/. Same SQL dialect, same
 * migrations, so `npm run dev` works with no database to install and nothing
 * to configure, and what you test locally is what runs in production.
 */
export const PGLITE_PATH = process.env.PGLITE_PATH ?? './.pglite';

const connectionString = process.env.DATABASE_URL?.trim();
export const usingPglite = !connectionString;

function createPostgresClient(url: string) {
  return postgres(url, {
    // Serverless instances are many and short-lived: hold one socket each and
    // let the pooler do the pooling.
    max: Number(process.env.DATABASE_POOL_MAX ?? 1),
    idle_timeout: 20,
    connect_timeout: 15,
    // Required behind a transaction pooler (PgBouncer, Supabase, Neon pooled).
    prepare: false,
    onnotice: () => {},
  });
}

function create(): Database {
  if (connectionString) {
    return drizzlePostgres(createPostgresClient(connectionString), { schema });
  }

  if (process.env.VERCEL) {
    // PGlite is a single-process database on the local filesystem. On Vercel
    // the filesystem is read-only apart from /tmp, instances are many and
    // short-lived, and nothing written survives. Failing here is far kinder
    // than appearing to work and losing every account.
    throw new Error(
      'DATABASE_URL is required on Vercel. PGlite cannot persist there — attach ' +
        'Postgres (Vercel Postgres, Neon or Supabase) and set DATABASE_URL in ' +
        'Project Settings → Environment Variables.',
    );
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[pathway] DATABASE_URL is not set. Falling back to PGlite, which is single-process ' +
        'and local-only. Fine for `next start` on one machine, not for a real deployment.',
    );
  }

  // Resolved at runtime rather than imported, so the WASM package is never
  // pulled into a bundle that has a real database configured. createRequire
  // works the same whether the surrounding module ends up ESM or CJS.
  const load = createRequire(import.meta.url);
  const { PGlite } = load('@electric-sql/pglite') as typeof import('@electric-sql/pglite');
  // Both drivers speak the same dialect, so the query surface is identical.
  return drizzlePglite(new PGlite(PGLITE_PATH), { schema }) as unknown as Database;
}

// Reused across hot reloads in dev and across invocations on a warm instance.
const globalForDb = globalThis as unknown as { __pathwayDb?: Database };

function connection(): Database {
  if (!globalForDb.__pathwayDb) {
    globalForDb.__pathwayDb = create();
  }
  return globalForDb.__pathwayDb;
}

/**
 * Connects on first query rather than on import.
 *
 * `next build` loads every route's module graph in parallel workers. Opening a
 * connection at import time meant each worker raced for the same embedded
 * database, and it means a build needs credentials it has no use for. Deferring
 * keeps builds database-free and shortens serverless cold starts for requests
 * that never touch Postgres.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, property, receiver) {
    const real = connection() as unknown as Record<string | symbol, unknown>;
    const value = Reflect.get(real, property, receiver);
    return typeof value === 'function' ? value.bind(real) : value;
  },
  has(_target, property) {
    return property in (connection() as unknown as object);
  },
});

export { schema };
