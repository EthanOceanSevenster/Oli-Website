/**
 * Serves a PGlite database over the real Postgres wire protocol.
 *
 * Lets you exercise the production driver path — postgres.js, the wire
 * protocol and the Drizzle postgres-js adapter — without provisioning a
 * database or holding any credentials:
 *
 *   npm run dev:pg                                   # terminal 1
 *   DATABASE_URL=postgres://pathway@127.0.0.1:55432/postgres npm run db:setup
 *   DATABASE_URL=postgres://pathway@127.0.0.1:55432/postgres npm run dev
 *
 * Development only. Never point production at this.
 */
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

const PORT = Number(process.env.PG_WIRE_PORT ?? 55432);
const DATA_DIR = process.env.PG_WIRE_PATH ?? './.pglite-wire';

async function main() {
  const db = await PGlite.create({ dataDir: DATA_DIR });
  const server = new PGLiteSocketServer({ db, port: PORT, host: '127.0.0.1' });

  await server.start();
  console.log(`Postgres wire protocol on 127.0.0.1:${PORT} (data: ${DATA_DIR})`);
  console.log(`DATABASE_URL=postgres://pathway@127.0.0.1:${PORT}/postgres`);

  const shutdown = async () => {
    await server.stop();
    await db.close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((error) => {
  console.error('Could not start the wire-protocol server:', error);
  process.exit(1);
});
