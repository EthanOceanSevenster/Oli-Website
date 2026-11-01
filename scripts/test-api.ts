/**
 * End-to-end check of every endpoint, against a running server.
 *
 *   npm run dev                       # in one terminal
 *   npm run test:api                  # in another
 *   BASE_URL=https://pathway.vercel.app npm run test:api
 *
 * Exits non-zero on the first failing expectation, so it can gate a deploy.
 */
const BASE = (process.env.BASE_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '');

let passed = 0;
const failures: string[] = [];

/* ------------------------------------------------------------- cookie jar -- */

const jar = new Map<string, string>();

function remember(response: Response) {
  for (const cookie of response.headers.getSetCookie?.() ?? []) {
    const [pair] = cookie.split(';');
    const index = pair!.indexOf('=');
    const name = pair!.slice(0, index);
    const value = pair!.slice(index + 1);
    if (value === '' || /expires=Thu, 01 Jan 1970/i.test(cookie)) jar.delete(name);
    else jar.set(name, value);
  }
}

function cookieHeader(): string {
  return [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
}

type CallOptions = { method?: string; body?: unknown; origin?: string | null; cookies?: boolean };

async function call(path: string, options: CallOptions = {}) {
  const { method = 'GET', body, origin = BASE, cookies = true } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (origin) headers['Origin'] = origin;
  if (cookies && jar.size) headers['Cookie'] = cookieHeader();

  const response = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    redirect: 'manual',
  });

  if (cookies) remember(response);

  const text = await response.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* HTML pages and empty bodies are fine */
  }

  return { status: response.status, json, text, headers: response.headers };
}

/* --------------------------------------------------------------- asserts -- */

function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed += 1;
    console.log(`  \u001b[32mPASS\u001b[0m  ${label}`);
  } else {
    failures.push(label);
    console.log(`  \u001b[31mFAIL\u001b[0m  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

function group(name: string) {
  console.log(`\n\u001b[1m${name}\u001b[0m`);
}

/**
 * Postgres `jsonb` normalises object key order, so comparing serialised JSON
 * reports a difference where there is none. Array order is preserved and is
 * compared strictly.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);

  return (
    keys.length === Object.keys(right).length &&
    keys.every((key) => key in right && deepEqual(left[key], right[key]))
  );
}

const unique = `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
const PASSWORD = 'PathwayTest2026!';

/* ----------------------------------------------------------------- suite -- */

async function run() {
  console.log(`Testing ${BASE}\n${'='.repeat(50)}`);

  group('Health');
  {
    const r = await call('/api/health');
    check('health returns 200', r.status === 200, `got ${r.status}`);
    check('health reports a reachable database', r.json?.status === 'ok', JSON.stringify(r.json));
  }

  group('Page');
  {
    const r = await call('/');
    check('landing page returns 200', r.status === 200, `got ${r.status}`);
    check('page carries the asset map', r.text.includes('pathway-assets'));
    check('page loads the prototype bundle', r.text.includes('/pathway/js/app.js'));
    check(
      'signed-out page has null bootstrap',
      /id="pathway-bootstrap"[^>]*>null</.test(r.text),
    );
    check('security header present', r.headers.get('x-frame-options') === 'DENY');
  }

  group('Static assets');
  for (const asset of [
    '/pathway/css/app.css',
    '/pathway/js/boot.js',
    '/pathway/js/app.js',
    '/pathway/js/sync.js',
    '/pathway/js/data/universities.js',
    '/pathway/img/mark.webp',
    '/pathway/img/scene.webp',
  ]) {
    const r = await call(asset);
    check(`${asset} serves`, r.status === 200, `got ${r.status}`);
  }

  group('Registration validation');
  {
    let r = await call('/api/auth/register', { method: 'POST', body: { email: 'x', password: PASSWORD } });
    check('rejects a malformed email', r.status === 400, `got ${r.status}`);

    r = await call('/api/auth/register', { method: 'POST', body: { email: unique, password: 'short' } });
    check('rejects a short password', r.status === 400, `got ${r.status}`);

    r = await call('/api/auth/register', {
      method: 'POST',
      body: { email: unique, password: PASSWORD, grade: '8' },
    });
    check('rejects an out-of-range grade', r.status === 400, `got ${r.status}`);

    r = await call('/api/auth/register', {
      method: 'POST',
      body: { email: unique, password: PASSWORD, dateOfBirth: '12 April' },
    });
    check('rejects an unparseable date of birth', r.status === 400, `got ${r.status}`);

    r = await call('/api/auth/register', {
      method: 'POST',
      body: { email: unique, password: PASSWORD },
      origin: 'https://evil.example.com',
    });
    check('rejects a cross-origin write', r.status === 403, `got ${r.status}`);
  }

  group('Registration');
  {
    const r = await call('/api/auth/register', {
      method: 'POST',
      body: {
        email: unique.toUpperCase(),
        password: PASSWORD,
        firstName: 'Thandi',
        grade: '12',
        dateOfBirth: '2008-07-03',
      },
    });
    check('creates the account', r.status === 201, `got ${r.status}: ${r.text.slice(0, 120)}`);
    check('normalises the email to lowercase', r.json?.learner?.email === unique);
    check('returns the date of birth as an ISO date', r.json?.learner?.dateOfBirth === '2008-07-03');
    check('grade 12 unlocks the Applications Hub', r.json?.learner?.applicationsHub === true);
    check('a plan is required for access', r.json?.learner?.hasAccess === false);
    check('sets a session cookie', jar.has('pathway_session'));

    const dup = await call('/api/auth/register', {
      method: 'POST',
      body: { email: unique, password: PASSWORD },
    });
    check('refuses a duplicate email', dup.status === 409, `got ${dup.status}`);
  }

  group('Session');
  {
    const me = await call('/api/auth/me');
    check('me returns the signed-in learner', me.json?.learner?.email === unique);

    const page = await call('/');
    check('page now carries bootstrap state', page.text.includes(unique));
  }

  group('Progress');
  {
    const blob = { users: { [unique]: { grade: '12', progress: { a1: { done: true } } } }, theme: 'dark' };

    const saved = await call('/api/progress', { method: 'PUT', body: { data: blob } });
    check('saves the blob', saved.status === 200 && saved.json?.saved === true, `got ${saved.status}`);

    const read = await call('/api/progress');
    check(
      'reads the blob back unchanged',
      deepEqual(read.json?.data, blob),
      JSON.stringify(read.json?.data)?.slice(0, 120),
    );

    const awkward = {
      nested: { x: { y: 'deep' } },
      list: [3, 1, 2],
      unicode: 'déjà vu — Zamakhele',
      float: 0.1 + 0.2,
      nothing: null,
      empty: {},
    };
    await call('/api/progress', { method: 'PUT', body: { data: awkward } });
    const roundTrip = await call('/api/progress');
    check(
      'preserves nesting, array order, unicode, floats and nulls',
      deepEqual(roundTrip.json?.data, awkward),
      JSON.stringify(roundTrip.json?.data)?.slice(0, 160),
    );

    // Put the realistic blob back for the sign-out test below.
    await call('/api/progress', { method: 'PUT', body: { data: blob } });

    const bad = await call('/api/progress', { method: 'PUT', body: { data: 'nope' } });
    check('rejects a non-object blob', bad.status === 400, `got ${bad.status}`);

    const huge = await call('/api/progress', {
      method: 'PUT',
      body: { data: { pad: 'x'.repeat(1_100_000) } },
    });
    check('rejects an oversized blob', huge.status === 413, `got ${huge.status}`);

    const cross = await call('/api/progress', {
      method: 'PUT',
      body: { data: blob },
      origin: 'https://evil.example.com',
    });
    check('rejects a cross-origin save', cross.status === 403, `got ${cross.status}`);
  }

  group('Subscription (simulated checkout)');
  {
    const before = await call('/api/auth/me');
    check('starts with no plan', before.json?.learner?.plan === 'none', before.json?.learner?.plan);

    const bad = await call('/api/subscription', { method: 'POST', body: { plan: 'free' } });
    check('rejects an unknown plan', bad.status === 400, `got ${bad.status}`);

    const cross = await call('/api/subscription', {
      method: 'POST',
      body: { plan: 'annual' },
      origin: 'https://evil.example.com',
    });
    check('rejects a cross-origin subscribe', cross.status === 403, `got ${cross.status}`);

    const ok = await call('/api/subscription', { method: 'POST', body: { plan: 'annual' } });
    check('records the annual plan', ok.json?.learner?.plan === 'annual', JSON.stringify(ok.json)?.slice(0, 120));
    check('grants access', ok.json?.learner?.hasAccess === true);
    check('flags that checkout is simulated', ok.json?.simulated === true);

    const after = await call('/api/auth/me');
    check('the plan survives on the account', after.json?.learner?.hasAccess === true);
  }

  group('Universities');
  {
    const all = await call('/api/universities');
    check('lists all 24 institutions', all.json?.count === 24, `got ${all.json?.count}`);

    const search = await call('/api/universities?q=stellen');
    check('searches by name', search.json?.results?.[0]?.abbr === 'SU', JSON.stringify(search.json)?.slice(0, 120));

    const acronym = await call('/api/universities?q=UJ');
    check('searches by acronym', acronym.json?.results?.some((u: any) => u.abbr === 'UJ'));

    const partial = await call('/api/universities?verification=partial');
    check('filters to 12 partially verified', partial.json?.count === 12, `got ${partial.json?.count}`);

    const review = await call('/api/universities?verification=review');
    check('filters to 12 needing review', review.json?.count === 12, `got ${review.json?.count}`);

    const invalid = await call('/api/universities?verification=bogus');
    check('rejects an unknown verification filter', invalid.status === 400, `got ${invalid.status}`);

    const detail = await call('/api/universities/uj');
    check('returns one institution with its payload', detail.json?.abbr === 'UJ' && !!detail.json?.payload);

    const upper = await call('/api/universities/UJ');
    check('institution codes are case-insensitive', upper.status === 200, `got ${upper.status}`);

    const missing = await call('/api/universities/nope');
    check('unknown code is a 404', missing.status === 404, `got ${missing.status}`);
  }

  group('Sign out and back in');
  {
    // The rate-limiting group below deliberately exhausts the per-IP login
    // budget, so two runs inside a minute would fail here for the wrong
    // reason. Say so plainly rather than reporting a confusing failure.
    const throttled = (r: { status: number }) =>
      r.status === 429 ? ' (rate limited by a previous run — wait a minute and re-run)' : '';

    const out = await call('/api/auth/logout', { method: 'POST' });
    check('signs out', out.status === 200, `got ${out.status}`);

    const me = await call('/api/auth/me');
    check('me is empty after signing out', me.json?.learner === null);

    const locked = await call('/api/progress');
    check('progress needs a session', locked.status === 401, `got ${locked.status}`);

    const wrong = await call('/api/auth/login', {
      method: 'POST',
      body: { email: unique, password: 'WrongPassword123' },
    });
    check('refuses a wrong password', wrong.status === 401, `got ${wrong.status}${throttled(wrong)}`);

    const unknown = await call('/api/auth/login', {
      method: 'POST',
      body: { email: 'nobody@example.com', password: PASSWORD },
    });
    check('refuses an unknown account', unknown.status === 401, `got ${unknown.status}${throttled(unknown)}`);

    const good = await call('/api/auth/login', { method: 'POST', body: { email: unique, password: PASSWORD } });
    check('signs back in', good.status === 200, `got ${good.status}${throttled(good)}`);

    const restored = await call('/api/progress');
    check('progress survived the sign-out', restored.json?.data?.theme === 'dark');
  }

  group('Rate limiting');
  {
    let limited = false;
    for (let i = 0; i < 20 && !limited; i += 1) {
      const r = await call('/api/auth/login', {
        method: 'POST',
        body: { email: unique, password: 'WrongPassword123' },
      });
      if (r.status === 429) limited = true;
    }
    check('throttles repeated sign-in attempts', limited);
  }

  console.log(`\n${'='.repeat(50)}`);
  if (failures.length === 0) {
    console.log(`\u001b[32mAll ${passed} checks passed.\u001b[0m`);
    process.exit(0);
  }
  console.log(`\u001b[31m${failures.length} failed\u001b[0m, ${passed} passed:`);
  for (const failure of failures) console.log(`  - ${failure}`);
  process.exit(1);
}

run().catch((error) => {
  console.error('\nTest run crashed:', error);
  process.exit(1);
});
