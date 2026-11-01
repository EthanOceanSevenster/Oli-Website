import { NextResponse } from 'next/server';

export function json(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Session cookies are SameSite=Lax, which already blocks cross-site POSTs.
 * This is the second lock: a mutating request must either carry no Origin
 * (same-origin fetch from some clients, curl, server-to-server) or an Origin
 * matching the host the request arrived on.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function requireSameOrigin(request: Request) {
  return sameOrigin(request) ? null : fail('Cross-origin request refused.', 403);
}

/**
 * The origin a payment provider should call us back on.
 *
 * `request.url` can carry the internal host behind a proxy, and a notify_url
 * that only resolves inside the platform never gets called. Set PUBLIC_ORIGIN
 * to pin it; otherwise we trust the forwarded headers the host sets.
 */
export function publicOrigin(request: Request): string {
  const configured = process.env.PUBLIC_ORIGIN?.trim();
  if (configured) return configured.replace(/\/+$/, '');

  const first = (value: string | null) => value?.split(',')[0]?.trim() ?? '';
  const host = first(request.headers.get('x-forwarded-host')) || first(request.headers.get('host'));
  if (!host) return new URL(request.url).origin;

  return `${first(request.headers.get('x-forwarded-proto')) || 'https'}://${host}`;
}

export async function readJson<T = Record<string, unknown>>(request: Request): Promise<T | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as T) : null;
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------- rate limiting -- */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * A small fixed-window limiter for the credential endpoints.
 *
 * This is per-instance memory, so on a serverless host it limits each warm
 * instance rather than the fleet. It raises the cost of online guessing but is
 * not a substitute for a shared store — see the README for swapping in Redis.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Guards an auth endpoint, returning a 429 response when the caller is over. */
export function guardCredentials(request: Request, scope: string) {
  const allowed = rateLimit(`${scope}:${clientIp(request)}`, 10, 60_000);
  return allowed ? null : fail('Too many attempts. Try again in a minute.', 429);
}
