import { NextResponse } from 'next/server';

import { DEMO_COOKIE, demoCookieValue, keyMatches } from '@/lib/demo';
import { fail } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Turns demo learners on for this browser only.
 *
 *   /api/demo-access?key=<DEMO_ACCESS_KEY>   unlock
 *   /api/demo-access?key=off                 lock again
 *
 * The cookie is httpOnly: the page reads the flag from the server on render,
 * so nothing in the browser can switch demo mode on by itself.
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get('key') ?? '';
  const home = new URL('/', request.url);

  if (key === 'off') {
    const response = NextResponse.redirect(home);
    response.cookies.delete(DEMO_COOKIE);
    return response;
  }

  if (!process.env.DEMO_ACCESS_KEY?.trim()) {
    return fail('Demo access is not configured. Set DEMO_ACCESS_KEY.', 404);
  }

  if (!keyMatches(key)) {
    // Same answer as an unconfigured install, so this cannot be probed.
    return fail('Not found.', 404);
  }

  const response = NextResponse.redirect(home);
  response.cookies.set(DEMO_COOKIE, demoCookieValue(process.env.DEMO_ACCESS_KEY!.trim()), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_YEAR,
  });
  return response;
}
