import { createHash, timingSafeEqual } from 'node:crypto';

import { cookies } from 'next/headers';

export const DEMO_COOKIE = 'pathway_demo';

/**
 * Demo learners skip payment and their password sits in the public bundle, so
 * whether they exist at all is decided here, on the server, and never by the
 * browser asking nicely.
 *
 * Unlock by visiting /api/demo-access?key=<DEMO_ACCESS_KEY> once. That sets an
 * httpOnly cookie this reads on every render. With no key configured, demo
 * mode is simply off in production — there is nothing to guess.
 */
function secret(): string | null {
  const key = process.env.DEMO_ACCESS_KEY?.trim();
  return key ? key : null;
}

/** The cookie holds a hash, so the key itself is never stored in the browser. */
export function demoCookieValue(key: string): string {
  return createHash('sha256').update(`pathway-demo:${key}`).digest('hex');
}

export function keyMatches(candidate: string): boolean {
  const key = secret();
  if (!key) return false;

  const a = Buffer.from(createHash('sha256').update(candidate).digest('hex'));
  const b = Buffer.from(createHash('sha256').update(key).digest('hex'));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function demoEnabled(): Promise<boolean> {
  const key = secret();

  // Outside production, demo learners are how you work on the thing.
  if (!key) return process.env.NODE_ENV !== 'production';

  const jar = await cookies();
  const value = jar.get(DEMO_COOKIE)?.value;
  if (!value) return false;

  const expected = Buffer.from(demoCookieValue(key));
  const actual = Buffer.from(value);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
