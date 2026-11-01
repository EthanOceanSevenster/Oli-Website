import { destroySession } from '@/lib/auth';
import { json, requireSameOrigin } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const blocked = requireSameOrigin(request);
  if (blocked) return blocked;

  await destroySession();
  return json({ signedOut: true });
}
