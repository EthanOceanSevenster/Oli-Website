import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { payments } from '@/lib/db/schema';
import { publicOrigin } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Where Payfast sends the learner's browser afterwards.
 *
 * This proves nothing about the payment — anyone can open it — so it only
 * decides which page to show. Whether access was granted was settled by the
 * ITN callback, which may still be in flight when this runs; in that case the
 * pay page polls `/api/payfast/status` until it lands.
 *
 * A real path rather than a `#/` route, because a fragment is not guaranteed
 * to survive the trip back through a payment provider.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = publicOrigin(request);
  const id = url.searchParams.get('id') ?? '';
  const cancelled = url.searchParams.get('cancelled') === '1';

  const to = (hash: string) => NextResponse.redirect(`${origin}/${hash}`);

  if (cancelled) return to('#/plans?cancelled=1');
  if (!/^[0-9a-f-]{36}$/i.test(id)) return to('#/plans');

  const [payment] = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  if (!payment) return to('#/plans');
  if (payment.state === 'cancelled' || payment.state === 'failed') return to('#/plans?failed=1');

  // Both the settled and the still-waiting case go to the same place. The
  // browser's own copy of the account does not know it has been paid for yet,
  // and would bounce straight off #/home; the pay page asks the server first,
  // then sends them on. When the ITN has already landed that is instant.
  return to(`#/pay?plan=${payment.plan}&pending=${payment.id}`);
}
