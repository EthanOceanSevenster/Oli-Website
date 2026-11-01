import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Only read by `drizzle-kit push`/`studio`. `generate` works without it,
    // which is how migrations are produced here.
    url: process.env.DATABASE_URL ?? 'postgres://localhost:5432/pathway',
  },
  strict: true,
  verbose: true,
} satisfies Config;
