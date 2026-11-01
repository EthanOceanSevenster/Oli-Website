import { eq } from 'drizzle-orm';

import { getCurrentLearner } from '@/lib/auth';
import { db } from '@/lib/db';
import { progress } from '@/lib/db/schema';
import { demoEnabled } from '@/lib/demo';
import { payfastConfig } from '@/lib/payfast';

// The page carries per-learner state, so it is never statically cached.
export const dynamic = 'force-dynamic';

const ASSETS = {
  MARK: '/pathway/img/mark.webp',
  WORD: '/pathway/img/word.webp',
  SCENE: '/pathway/img/scene.webp',
  SCENE_LIGHT: '/pathway/img/scene_light.webp',
} as const;

/** Background wash, lifted from the prototype. */
const BACKDROP = `
  <div class="wash"></div>
  <svg viewBox="0 0 1000 700" fill="none">
    <path d="M1000 90 C 760 170, 520 420, 420 700" style="stroke:rgba(var(--acc-rgb),.35)" stroke-width="1.4"/>
    <path d="M1000 200 C 780 260, 610 470, 560 700" stroke="rgba(242,196,109,.28)" stroke-width="1.1"/>
    <path d="M1000 330 C 850 380, 740 540, 720 700 L1000 700 Z" style="fill:rgba(var(--acc2-rgb),.06)"/>
    <path d="M1000 470 C 900 500, 840 600, 830 700" style="stroke:rgba(242,196,109,.16)" stroke-width="1"/>
  </svg>
`;

/**
 * Embeds JSON in a <script> tag. Escaping `<` keeps learner-supplied content
 * from closing the tag early and becoming markup.
 */
function embed(value: unknown): string {
  return JSON.stringify(value ?? null).replace(/</g, '\\u003c');
}

export default async function Page() {
  const learner = await getCurrentLearner();
  const demo = await demoEnabled();
  const payfast = payfastConfig();

  let bootstrap: { email: string; data: unknown; updatedAt: string } | null = null;

  if (learner) {
    const [row] = await db
      .select()
      .from(progress)
      .where(eq(progress.learnerId, learner.id))
      .limit(1);

    if (row) {
      bootstrap = {
        email: learner.email,
        data: row.data,
        updatedAt: row.updatedAt.toISOString(),
      };
    }
  }

  return (
    <>
      <div id="appbg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: BACKDROP }} />

      {/*
        The prototype owns everything inside these two nodes. They are rendered
        empty and marked as externally managed so React never reconciles away
        what app.js writes into them.
      */}
      <div id="app" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: '' }} />
      <div
        id="toast"
        role="status"
        aria-live="polite"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: '' }}
      />

      <script
        id="pathway-assets"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: embed(ASSETS) }}
      />
      {/*
        Whether demo learners exist is a server decision. Without this flag the
        prototype never seeds them, never shows the pill, and refuses #/demo —
        so the credentials sitting in the public bundle lead nowhere.
      */}
      <script
        id="pathway-demo"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: embed(demo) }}
      />
      {/*
        Whether the checkout is real. Without Payfast credentials the
        prototype's simulated card form stands in, so the site keeps working
        on an install that cannot take money yet. Merchant credentials stay on
        the server; only this flag crosses to the browser.
      */}
      <script
        id="pathway-payfast"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: embed({ enabled: payfast !== null, sandbox: payfast?.sandbox ?? false }),
        }}
      />
      <script
        id="pathway-bootstrap"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: embed(bootstrap) }}
      />

      {/*
        `defer` is what the prototype needs: these run after the DOM above
        exists, and in written order — boot.js sets up globals, app.js reads
        them, sync.js wraps the save() that app.js defines.
      */}
      <script defer src="/pathway/js/boot.js" />
      <script defer src="/pathway/js/api.js" />
      <script defer src="/pathway/js/data/universities.js" />
      <script defer src="/pathway/js/app.js" />
      <script defer src="/pathway/js/sync.js" />
    </>
  );
}
