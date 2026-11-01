# Payments — Payfast

PATHWAY takes money through [Payfast](https://payfast.io), a South African
payment provider. Learners pay by card, EFT or instant EFT on Payfast's own
pages; this site never sees a card number.

**The code is built and tested. What is left is a Payfast account**, which
only you can open, because it needs your ID and your bank details.

---

## 1. Your bank account goes to Payfast, not into this repo

Payfast holds the bank account and pays out into it. Nothing in this codebase
stores, needs or should ever contain an account number — if you find one in a
file here, it does not belong there.

You enter the account once, in Payfast's dashboard, during registration.

Two things to know before you start:

- **The bank account must belong to whoever registers the Payfast account.**
  Payfast verifies this against a bank confirmation letter. If you register as
  an individual or sole trader, register in the account holder's name. If
  PATHWAY is a registered company, Payfast will expect a business bank account
  in the company's name instead, so decide which one you are opening before
  you start.
- **You can take payments before verification finishes, but you cannot
  withdraw.** Money accumulates in the Payfast account and is released once
  the documents are approved.

What Payfast asks for, for an individual or sole trader:

- A valid South African ID or passport
- Proof of physical address, dated within the last three months
- A bank confirmation letter or a recent bank statement

Scanned copies are fine, uploaded through the dashboard.

---

## 2. Register and switch it on

1. Open an account at **https://registration.payfast.io**.
2. Add the **bank account** that payouts should go to, and upload the FICA
   documents above.
3. In the dashboard, go to **Settings → Integration** and copy the
   **Merchant ID** and **Merchant Key**.
4. On the same page, set a **passphrase** and copy it exactly.
   Use letters and digits only — see the warning in section 6.
5. Still in **Settings**, switch on **Recurring Billing**. Without it the
   monthly plan cannot be sold; the annual plan works either way.
6. Put the three values into Vercel under **Settings → Environment
   Variables**, for Production:

   ```
   PAYFAST_MERCHANT_ID=...
   PAYFAST_MERCHANT_KEY=...
   PAYFAST_PASSPHRASE=...
   ```

7. Redeploy.

That is the whole switch. While those variables are unset the site falls back
to the prototype's simulated card form, so nothing breaks in the meantime —
and the moment they are set, checkout becomes real.

---

## 3. What the learner pays

| Plan | Price | What Payfast is told |
| --- | --- | --- |
| Annual | R199.00 | A single payment. Nothing renews. Buys 365 days. |
| Monthly | R20.00 | A real subscription, billed monthly, running until cancelled. Each successful cycle adds 31 days. |

This matches what the pricing page promises: "one payment for the year" and
"cancel anytime". A learner cancels a monthly subscription from their Payfast
receipt, or you can cancel it from the Payfast dashboard — the subscription's
token is stored on the payment row for exactly that.

Cancelling never takes back time already paid for.

Payfast deducts its fee per successful transaction and pays out the rest.
Check the current rates at https://payfast.io/fees — they are not in this repo
because they change.

---

## 4. How access is actually granted

This is the part worth understanding, because it is what stops someone paying
nothing and getting a year of access.

When the learner finishes paying, Payfast does **two** things:

1. Sends the learner's browser back to `/api/payfast/return`.
2. Separately, server to server, posts a notification (an "ITN") to
   `/api/payfast/notify`.

**Only the second one grants anything.** The browser's return trip proves
nothing — anyone can open that URL — so it just decides which page to show.

The notification has to pass four checks before a cent is believed:

1. **The signature matches.** Producing it requires the passphrase, which
   never leaves the server.
2. **It came from a Payfast IP**, checked against their published ranges.
3. **The amount equals what we quoted**, read from our own payment row rather
   than from anything the notification claims.
4. **Payfast confirms it sent it**, over a connection we open to a host we
   chose — so a forged notification cannot vouch for itself.

It is also idempotent: Payfast retries until it gets a 200, and the
notification's own id is what decides whether it has already been acted on, so
a retry cannot extend access twice.

The browser usually gets home before the notification does. When that happens
the pay page shows "Confirming your payment" and asks the server every two
seconds until it lands.

---

## 5. Testing it

Two suites, neither of which moves money:

```bash
npm run test:payfast        # signatures, notification validation, IP ranges
npm run test:payfast:flow   # the callback end to end, against a scratch database
```

`test:payfast:flow` is the important one. It drives the real callback and
checks that a good notification grants exactly one term, that a renewal adds
to it rather than restarting it, that cancelling does not claw back paid time,
and that every bad notification — wrong signature, wrong passphrase, wrong
amount, wrong merchant, stranger's IP, unknown payment, replayed notification
— grants nothing at all.

Once you have real credentials, you can also point the site at Payfast's test
environment by adding `PAYFAST_SANDBOX=true`. The pay page then says **Test
mode** and no real money moves.

---

## 6. Two traps worth knowing about

**The passphrase must be letters and digits only.** Payfast's own PHP SDK
URL-encodes it *twice* when signing a checkout but only *once* when verifying
a notification. Those two readings are identical for an alphanumeric
passphrase and can differ for one containing spaces or symbols. Staying
alphanumeric sidesteps the ambiguity entirely.

**Payfast's shared sandbox merchant cannot be trusted to verify signatures.**
Anyone can log into merchant `10000100` and change its passphrase, and at the
time of writing even Payfast's own published SDK example is rejected by it
with "Generated signature does not match". So a signature failure against the
shared sandbox tells you nothing. This is why `npm run test:payfast` proves
the signature differentially instead — against a port of
`Auth::generateSignature` from Payfast's PHP SDK, which is what their
production integrations use. With your own credentials set, that same script
also runs the live check.

Where their written documentation and their SDK disagree, this code follows
the SDK. Three places that matters, each of which otherwise costs a signature
mismatch:

- The signed field list comes from the SDK, not the docs table.
- Values PHP's `empty()` skips are left out of the signature — including the
  string `"0"`, which is why `cycles=0` on a subscription is posted but not
  signed.
- The passphrase is appended last, after every other field.

---

## 7. Files

| File | What it does |
| --- | --- |
| `lib/payfast.ts` | Config, signatures, IP ranges, pricing, checkout fields |
| `app/api/payfast/checkout/route.ts` | Opens a payment and returns the signed form |
| `app/api/payfast/notify/route.ts` | The ITN callback — the only thing that grants access |
| `app/api/payfast/return/route.ts` | Where the learner's browser comes back to |
| `app/api/payfast/status/route.ts` | Polled by the pay page while the callback is in flight |
| `payments`, `payment_events` tables | The payment and the notifications that settled it |

`POST /api/subscription` still exists and still only records a chosen plan. It
is what the simulated checkout uses and it must never be what grants paid
access. Once Payfast is live, nothing reaches it.
