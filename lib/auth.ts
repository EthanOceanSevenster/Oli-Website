import { randomBytes, createHash, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

import { eq, lt } from 'drizzle-orm';
import { cookies } from 'next/headers';

import { db } from './db';
import { learners, sessions, type Learner } from './db/schema';

const scrypt = promisify(scryptCallback) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

export const SESSION_COOKIE = 'pathway_session';
const SESSION_TTL_DAYS = 30;
const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
const KEY_LENGTH = 64;

/* -------------------------------------------------------------- passwords -- */

/**
 * scrypt from Node's standard library: memory-hard, no native dependency to
 * build, and nothing extra to keep patched. Stored as `scrypt$salt$key`.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password.normalize('NFKC'), salt, KEY_LENGTH);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltB64, keyB64] = stored.split('$');
  if (scheme !== 'scrypt' || !saltB64 || !keyB64) return false;

  const expected = Buffer.from(keyB64, 'base64');
  const actual = await scrypt(password.normalize('NFKC'), Buffer.from(saltB64, 'base64'), expected.length);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/* --------------------------------------------------------------- sessions -- */

/** The cookie holds the token; the database only ever sees its hash. */
function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createSession(learnerId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.insert(sessions).values({ id: hashToken(token), learnerId, expiresAt });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });

  void sweepExpiredSessions();
}

export async function getCurrentLearner(): Promise<Learner | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [row] = await db
    .select({ learner: learners, expiresAt: sessions.expiresAt })
    .from(sessions)
    .innerJoin(learners, eq(sessions.learnerId, learners.id))
    .where(eq(sessions.id, hashToken(token)))
    .limit(1);

  if (!row) return null;

  if (row.expiresAt.getTime() <= Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, hashToken(token)));
    return null;
  }

  return row.learner;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.id, hashToken(token)));
  }

  jar.delete(SESSION_COOKIE);
}

/** Housekeeping, so the table does not grow without bound. */
async function sweepExpiredSessions(): Promise<void> {
  try {
    await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
  } catch {
    // Never let cleanup break a sign-in.
  }
}

/* ------------------------------------------------------------ derivations -- */

export function hasAccess(learner: Learner): boolean {
  if (learner.plan === 'none') return false;
  return learner.planExpires === null || learner.planExpires.getTime() > Date.now();
}

/** The Applications Hub is Grades 11-12 only. */
export function canUseApplicationsHub(learner: Learner): boolean {
  return learner.grade === '11' || learner.grade === '12';
}

export function publicLearner(learner: Learner) {
  return {
    email: learner.email,
    firstName: learner.firstName,
    lastName: learner.lastName,
    grade: learner.grade,
    dateOfBirth: learner.dateOfBirth,
    plan: learner.plan,
    hasAccess: hasAccess(learner),
    applicationsHub: canUseApplicationsHub(learner),
  };
}
