import { getCurrentLearner, publicLearner } from '@/lib/auth';
import { json } from '@/lib/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const learner = await getCurrentLearner();
  return json({ learner: learner ? publicLearner(learner) : null });
}
