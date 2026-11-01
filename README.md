# PATHWAY — Next.js + Postgres

**Explore • Plan • Track • Build Your Future**

The PATHWAY learner prototype on a Next.js stack, built to deploy on Vercel.

The prototype arrived as a single 1.7 MB HTML file that kept everything in one browser's `localStorage`. This repository keeps that front end working exactly as it did, splits it into cacheable assets, and puts a real backend behind it so learner accounts and progress outlive the browser they were created in.

For the product itself — grade rules, the Applications Hub, university verification status and the open pre-launch decisions — see [`docs/PROTOTYPE_HANDOVER.md`](docs/PROTOTYPE_HANDOVER.md).

---

## Quick start

```bash
npm install
npm run db:setup     # migrate + seed the 24 universities
npm run dev
```

Open <http://127.0.0.1:8000>. The **Demo login** pill bottom-left drops you into any of the four demo learners without signing up.

No database to install: without `DATABASE_URL` the app runs on [PGlite](https://pglite.dev) — real Postgres compiled to WebAssembly, stored in `.pglite/`. Same SQL dialect and same migrations as production, so what you test locally is what ships.

```bash
npm run test:api     # 51 checks against a running server
npm run typecheck
npm run build
```

---

## Layout

```
app/
  layout.tsx                 Document shell, fonts, theme bootstrap
  page.tsx                   Serves the prototype + this learner's server state
  api/
    health/                  Liveness + a real database round trip
    auth/{register,login,logout,me}/
    progress/                GET + PUT the learner state blob
    universities/            Directory, search, filter
    universities/[code]/     One institution with its full record
lib/
  auth.ts                    scrypt hashing, revocable server-side sessions
  http.ts                    Origin checks, rate limiting, JSON helpers
  validation.ts              Zod schemas for every request body
  db/
    schema.ts                learners, sessions, progress, universities
    index.ts                 Driver selection, lazy connection
    migrate.ts  seed.ts
drizzle/                     Generated SQL migrations
data/                        The 24 institutions, as JSON
public/pathway/
  css/app.css                155 KB, extracted from the prototype
  js/boot.js                 Runs first: asset URLs, seeds state from the server
  js/api.js                  Account client used by the prototype's own forms
  js/data/universities.js    University directory data
  js/app.js                  The prototype, with its auth screens wired to the API
  js/sync.js                 Runs last: pushes saves back to the API
  img/*.webp                 Logo, wordmark and the two hero scenes
scripts/
  test-api.ts                The endpoint suite
  pg-wire.ts                 Serves PGlite over the Postgres wire protocol
legacy-django/               The earlier Django build — safe to delete
```

### What changed in the prototype's own JavaScript

Deliberately little, so the file stays easy to diff against the original:

| Original | Now | Why |
| --- | --- | --- |
| `const MARK = "data:image/webp;base64,…"` (and SCENE, SCENE_LIGHT, WORD) | `window.PATHWAY_ASSETS.MARK` | Real files under `public/pathway/img/`, cached separately |
| `const UNI_DB = [ …752 KB… ]` | `window.UNI_DB` | Loaded from its own cacheable file |
| `signin.after` checked `DB.users[em].pw` | `PathwayAPI.login(...)` | Real accounts; demo learners still fall back to the local check |
| `signup` wrote `DB.users[d.em]` with `pw` | `PathwayAPI.register(...)` first | The server owns the email; no password stored in the browser |
| `pay` set `u.sub` only | also `PathwayAPI.subscribe(k)` | The chosen plan follows the learner to another device |
| `logout` cleared `DB.session` | also `PathwayAPI.logout()` | Revokes the server session, not just the local one |

Everything else — routing, grade rules, the Applications Hub, the assessments, all 43 screens — is byte-for-byte what was handed over.

---

## How the front end and the server fit together

The prototype owns its own state and still works with the server switched off. Two small files bracket it:

1. **`boot.js`** runs before `app.js`. It hands over the asset URLs and, for a signed-in learner, seeds `localStorage` from the blob the server rendered into the page. The server copy wins **only when it is newer**, so work done offline in this browser is never silently discarded.
2. **`api.js`** is the account client. Every call returns `{ ok, status, data, offline }` and never throws, so the prototype can fall back to local behaviour when the network is gone.
3. **`sync.js`** runs after `app.js` and wraps the prototype's `save()`. Every save is pushed to `PUT /api/progress`, debounced to about a second, plus once more when the tab is hidden. It checks `PathwayAPI.signedIn` per save rather than only at page load, because a learner can sign up part way through a session and the prototype never reloads the page.

### Accounts are server-side

The prototype's own forms now call the API: `signin`, `signup`, `plans`/`pay` and sign-out. The server owns the email, hashes the password and holds the session; the prototype keeps its local store for everything a learner *does*, which syncs on every save.

What this changes:

- **The password never touches this browser.** The prototype used to keep an unsalted SHA-256 of it in `localStorage`. New accounts store no password locally at all.
- **An account works on any device.** Signing in on a clean browser pulls the learner's saved progress back down.
- **Signing out revokes the server session**, not just the local one.
- **Demo learners still work offline.** They exist only in the browser and never on the server, so sign-in falls back to the local check for them — and only for them.
- **Network failures degrade gracefully.** Sign-up and sign-in say so plainly instead of failing silently.

The scripts are plain `<script defer>` tags, which is exactly the ordering guarantee the prototype needs: they run after the DOM exists and in written order. React never touches `#app` — it is rendered empty and marked as externally managed, so the prototype's DOM is never reconciled away.

### API

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a learner and sign them in |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Sign out and revoke the session |
| `GET` | `/api/auth/me` | The current learner, or `null` |
| `GET` / `PUT` | `/api/progress` | The learner's state blob |
| `POST` | `/api/subscription` | Records the chosen plan (checkout itself is still simulated) |
| `GET` | `/api/universities` | Directory; `?q=` searches name and acronym, `?verification=` filters |
| `GET` | `/api/universities/<code>` | One institution with its full record |
| `GET` | `/api/health` | Liveness plus a real database round trip |

`progress.data` is the prototype's blob. The front end still owns its shape, so the server survives prototype changes; pull fields out into real columns as each part of the journey settles. `jsonb` preserves values, nesting and array order exactly — it normalises object key order, which nothing depends on.

### Security

- **Passwords**: scrypt from Node's standard library, per-password salt, constant-time compare. No native dependency to build or keep patched.
- **Sessions**: server-side and revocable. The cookie carries a 256-bit token; the database stores only its SHA-256, so a database leak does not hand over working sessions. `httpOnly`, `SameSite=Lax`, `Secure` in production.
- **CSRF**: `SameSite=Lax` blocks cross-site writes, with an `Origin` check on every mutating route behind it.
- **Rate limiting**: the credential endpoints allow 10 attempts per IP per minute. This is per-instance memory, so on serverless it limits each warm instance rather than the fleet — swap in Redis (Upstash) via `lib/http.ts` before launch.
- **Login timing**: an unknown address still pays the cost of a hash, so the endpoint does not quietly confirm which addresses are registered.
- Security headers (HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts`.

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod
```

Next.js is Vercel's own framework, so there is nothing to configure: no `vercel.json`, no build command, no static-file routing.

### Environment variables

Set these under **Settings → Environment Variables** (see `.env.example`):

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | **Required.** Any Postgres — Vercel Postgres, Neon, Supabase, RDS. Use the **pooled** connection string. |
| `DATABASE_POOL_MAX` | Optional, defaults to 1. Leave at 1 behind a pooler. |

**`DATABASE_URL` is mandatory on Vercel.** The app refuses to start without it rather than appearing to work: PGlite is a single-process database on the local filesystem, and on Vercel that filesystem is read-only apart from `/tmp` and nothing written survives.

After attaching a database, run the migrations once from your machine:

```bash
DATABASE_URL="postgres://..." npm run db:setup
```

Then check the deploy end to end:

```bash
BASE_URL="https://your-app.vercel.app" npm run test:api
```

### Testing the production driver locally

Local development uses PGlite in-process; production uses the `postgres` driver over the wire protocol. To exercise the production path without provisioning a database:

```bash
npm run dev:pg                                                        # terminal 1
export DATABASE_URL=postgres://pathway@127.0.0.1:55432/postgres       # terminal 2
npm run db:setup && npm run dev
```

That serves PGlite over the real Postgres wire protocol, so postgres.js, the protocol and the Drizzle adapter are all genuinely exercised.

---

## University data

`npm run db:seed` loads 24 institutions from two files in `data/`: the directory record the front end renders, and the Applications Hub record carrying each one's verification status and the date it was last checked. It matches on the institution code, so re-running updates rather than duplicates. Once someone has started confirming records by hand, re-seed with `npm run db:seed -- --keep-verification` to leave their work alone.

Status as imported, unchanged from the handover: **12 partially verified, 12 need review, none fully verified**, all last checked 11 October 2026.

> Deadlines, fees and application links in this data are time-sensitive and incomplete. Reconfirm them against the official institutions before relying on them or publishing them as final. Section 4 of the handover document lists what is known to be missing or contradictory.

---

## Known limitations carried over from the prototype

These are the prototype's, not this stack's, and they still apply:

- **Checkout is simulated.** No money moves. The test card is `4242 4242 4242 4242`. `POST /api/subscription` only records which plan was chosen so access survives a new device — it must not be what grants paid access once real payments exist. Replace the call site with a payment provider's webhook before launch.
- **Demo accounts are live.** Four demo learners skip payment entirely. Set `SHOW_DEMO_LOGIN = false` near the top of `public/pathway/js/app.js` and remove them before launch.
- **Parental consent is not implemented.** PATHWAY collects personal information from children. POPIA compliance needs legal review, and registration likely needs a parent/guardian consent step.
- **Password reset is not built.** The "Forgot password?" link still says the feature arrives at launch. It needs an email provider.
- **The UI is still the vanilla prototype**, served from `public/` rather than written as React components. That is deliberate: it is 4,772 lines across ~288 render functions and 43 screens, and it works exactly as handed over. Convert screens to React as you touch them rather than in one pass.
- **Journey steps 5–7** show an "opens later" message until they are designed.
- **Support has no destination.** `SUPPORT_ENDPOINT` in `app.js` is `null`.
- **A timezone bug in the deadline reminders** can show a date one day early in South African time. It predates this work and is still open.
- **The hero image is a ~1000px crop** of a reference screenshot. Replace it with the original artwork at `public/pathway/img/scene.webp`.
