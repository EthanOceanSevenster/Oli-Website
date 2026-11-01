import { createHash } from 'node:crypto';

/**
 * Payfast — the redirect ("custom") integration.
 *
 * The learner's browser POSTs a signed form to Payfast and pays there. The
 * trip back to us carries no proof of anything, so it never grants access:
 * Payfast reports the outcome server-to-server over the ITN callback, and
 * that notification is the only thing `app/api/payfast/notify` trusts.
 *
 * Spec: https://developers.payfast.co.za/docs — Custom Integration and ITN.
 */

/** Payfast's published sandbox merchant. Public test values, not secrets. */
const SANDBOX_MERCHANT = {
  merchantId: '10000100',
  merchantKey: '46f0cd694581a',
  passphrase: 'jt7NOE43FZPn',
} as const;

export type PayfastConfig = {
  merchantId: string;
  merchantKey: string;
  /** Empty when no passphrase is set on the Payfast dashboard. */
  passphrase: string;
  sandbox: boolean;
  /** Where the browser POSTs the signed checkout form. */
  processUrl: string;
  /** Where we ask Payfast to confirm a notification it supposedly sent. */
  validateUrl: string;
};

function env(name: string): string {
  return process.env[name]?.trim() ?? '';
}

/**
 * Null when Payfast has not been set up, which is what keeps the simulated
 * checkout working on an install with no credentials.
 *
 * `PAYFAST_SANDBOX=true` on its own runs against Payfast's public test
 * merchant, so the whole flow can be exercised before registering anything.
 */
export function payfastConfig(): PayfastConfig | null {
  const sandbox = env('PAYFAST_SANDBOX').toLowerCase() === 'true';
  const ownMerchant = env('PAYFAST_MERCHANT_ID');

  const merchantId = ownMerchant || (sandbox ? SANDBOX_MERCHANT.merchantId : '');
  const merchantKey = env('PAYFAST_MERCHANT_KEY') || (sandbox ? SANDBOX_MERCHANT.merchantKey : '');
  if (!merchantId || !merchantKey) return null;

  // An explicitly empty PAYFAST_PASSPHRASE means "no passphrase on the
  // dashboard", so only an unset variable falls back to the sandbox one.
  const passphrase =
    process.env.PAYFAST_PASSPHRASE === undefined
      ? sandbox && !ownMerchant
        ? SANDBOX_MERCHANT.passphrase
        : ''
      : env('PAYFAST_PASSPHRASE');

  const host = sandbox ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

  return {
    merchantId,
    merchantKey,
    passphrase,
    sandbox,
    processUrl: `https://${host}/eng/process`,
    validateUrl: `https://${host}/eng/query/validate`,
  };
}

export function payfastEnabled(): boolean {
  return payfastConfig() !== null;
}

/* ------------------------------------------------------------- signature -- */

/**
 * The fields that go into a checkout signature, in order.
 *
 * Taken from `Auth::generateSignature` in Payfast's own PHP SDK rather than
 * from the prose docs, which differ from it in small ways that each cost a
 * signature mismatch. A field outside this list is posted but not signed, so
 * adding one here that Payfast does not know about will break the checkout.
 *
 * Alphabetical ordering is the *API* signature format and does not apply.
 */
export const CHECKOUT_FIELD_ORDER = [
  'merchant_id',
  'merchant_key',
  'return_url',
  'cancel_url',
  'notify_url',
  'notify_method',
  'name_first',
  'name_last',
  'email_address',
  'cell_number',
  'm_payment_id',
  'amount',
  'item_name',
  'item_description',
  'custom_int1',
  'custom_int2',
  'custom_int3',
  'custom_int4',
  'custom_int5',
  'custom_str1',
  'custom_str2',
  'custom_str3',
  'custom_str4',
  'custom_str5',
  'email_confirmation',
  'confirmation_address',
  'currency',
  'payment_method',
  'subscription_type',
  'billing_date',
  'recurring_amount',
  'frequency',
  'cycles',
  'subscription_notify_email',
  'subscription_notify_webhook',
  'subscription_notify_buyer',
] as const;

/**
 * Whether PHP's `empty()` would skip this value, which is the test the SDK
 * applies when building the string.
 *
 * The catch is `'0'`: PHP calls that empty, so `cycles=0` — an indefinite
 * subscription — is posted but left out of the signature. Treating it as
 * present here would break every monthly checkout.
 */
function phpEmpty(value: string): boolean {
  return value === '' || value === '0';
}

/**
 * PHP's `urlencode`, which is what Payfast hashes with.
 *
 * `encodeURIComponent` leaves `!'()*~` alone where PHP escapes them, so a
 * learner called O'Brien would sign one string while Payfast checked another.
 * Spaces become `+` and hex digits are upper case, as the docs require.
 */
function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/[!'()*~]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, '+');
}

function md5(value: string): string {
  return createHash('md5').update(value).digest('hex');
}

function withPassphrase(paramString: string, passphrase: string): string {
  return passphrase ? `${paramString}&passphrase=${encode(passphrase)}` : paramString;
}

/** `a=1&b=2` over the signed fields, skipping the ones PHP calls empty. */
export function checkoutParamString(fields: Record<string, string>): string {
  return CHECKOUT_FIELD_ORDER.filter((name) => !phpEmpty((fields[name] ?? '').trim()))
    .map((name) => `${name}=${encode(fields[name]!.trim())}`)
    .join('&');
}

export function signCheckout(fields: Record<string, string>, passphrase: string): string {
  return md5(withPassphrase(checkoutParamString(fields), passphrase));
}

/* ------------------------------------------------------------------- ITN -- */

/** The posted body, in the order it arrived. Order is what the hash is over. */
export function parseItn(rawBody: string): Array<[string, string]> {
  return rawBody
    .split('&')
    .filter(Boolean)
    .map((pair) => {
      const split = pair.indexOf('=');
      const key = split === -1 ? pair : pair.slice(0, split);
      const value = split === -1 ? '' : pair.slice(split + 1);
      return [decodeURIComponent(key), decodeURIComponent(value.replace(/\+/g, ' '))] as [
        string,
        string,
      ];
    });
}

export function itnField(pairs: Array<[string, string]>, name: string): string {
  const found = pairs.find(([key]) => key === name);
  return found ? found[1] : '';
}

/**
 * Checks the notification's signature.
 *
 * The docs describe two readings of "all fields posted" — their PHP sample
 * stops at `signature`, their Node sample skips it and keeps going — and
 * re-encoding a decoded value can differ from the bytes Payfast hashed. So we
 * accept any of those spellings of the same data. Each still has to come out
 * to an MD5 over a string containing the passphrase, which is the part an
 * attacker cannot forge.
 */
export function verifyItnSignature(
  rawBody: string,
  pairs: Array<[string, string]>,
  passphrase: string,
): boolean {
  const claimed = itnField(pairs, 'signature').toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(claimed)) return false;

  const marker = rawBody.indexOf('signature=');
  const truncated = marker > 0 ? rawBody.slice(0, marker).replace(/&$/, '') : rawBody;
  const stripped = rawBody
    .split('&')
    .filter((pair) => !pair.startsWith('signature='))
    .join('&');
  const reencoded = pairs
    .filter(([key]) => key !== 'signature')
    .map(([key, value]) => `${key}=${encode(value)}`)
    .join('&');

  return [truncated, stripped, reencoded].some(
    (candidate) => md5(withPassphrase(candidate, passphrase)) === claimed,
  );
}

/**
 * Payfast's published server IPs. Notifications arrive from one of these, and
 * their docs recommend allow-listing all of them.
 */
const PAYFAST_RANGES = [
  '197.97.145.144/28',
  '41.74.179.192/27',
  '102.216.36.0/28',
  '102.216.36.128/28',
  '144.126.193.139/32',
] as const;

function ipToLong(ip: string): number | null {
  const parts = ip.trim().replace(/^::ffff:/i, '').split('.');
  if (parts.length !== 4) return null;

  let total = 0;
  for (const part of parts) {
    if (!/^[0-9]{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    total = total * 256 + octet;
  }
  return total;
}

export function isPayfastIp(ip: string): boolean {
  const address = ipToLong(ip);
  if (address === null) return false;

  return PAYFAST_RANGES.some((range) => {
    const [base, bits] = range.split('/');
    const network = ipToLong(base!);
    if (network === null) return false;
    const mask = (-1 << (32 - Number(bits))) >>> 0;
    return ((address & mask) >>> 0) === ((network & mask) >>> 0);
  });
}

/**
 * Asks Payfast whether it really sent this.
 *
 * The parameter string goes back without the passphrase appended — the
 * passphrase salts our own hash, it is not part of the posted data.
 */
export async function confirmWithPayfast(
  config: PayfastConfig,
  paramString: string,
): Promise<boolean> {
  try {
    const response = await fetch(config.validateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: paramString,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    return (await response.text()).trim().toUpperCase().startsWith('VALID');
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------- checkout -- */

/** Payfast's `frequency` codes for a subscription. */
export const FREQUENCY = {
  daily: 1,
  weekly: 2,
  monthly: 3,
  quarterly: 4,
  biannually: 5,
  annual: 6,
} as const;

export type Plan = 'monthly' | 'annual';

/**
 * What each plan costs and how long it buys, matching the pricing the
 * prototype shows.
 *
 * Monthly is a real Payfast subscription, so it renews by itself and the
 * learner can cancel it — which is what "cancel anytime" on the pricing page
 * promises. Annual is "one payment for the year", so it is a once-off that
 * simply buys 365 days.
 */
export const PRICING = {
  monthly: {
    amount: '20.00',
    days: 31,
    recurring: true,
    itemName: 'PATHWAY Monthly',
    itemDescription: 'PATHWAY monthly access — full platform access, cancel anytime',
  },
  annual: {
    amount: '199.00',
    days: 365,
    recurring: false,
    itemName: 'PATHWAY Annual',
    itemDescription: 'PATHWAY annual access — 12 months of full platform access',
  },
} as const satisfies Record<Plan, unknown>;

export type CheckoutInput = {
  config: PayfastConfig;
  /** Public origin, e.g. https://pathwayexplore.com — Payfast calls it back. */
  origin: string;
  /** Our payment row id, echoed back as `m_payment_id`. */
  paymentId: string;
  plan: Plan;
  firstName: string;
  lastName: string;
  email: string;
};

/**
 * The hidden fields the browser POSTs to Payfast, signed.
 *
 * Blank values are left out entirely rather than posted empty: Payfast hashes
 * what it receives, and an empty field changes that string.
 */
export function checkoutFields(input: CheckoutInput): Record<string, string> {
  const { config, origin, paymentId, plan } = input;
  const price = PRICING[plan];
  const base = `${origin}/api/payfast/return?id=${encodeURIComponent(paymentId)}`;

  const fields: Record<string, string> = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: base,
    cancel_url: `${base}&cancelled=1`,
    notify_url: `${origin}/api/payfast/notify`,
    name_first: input.firstName,
    name_last: input.lastName,
    email_address: input.email,
    m_payment_id: paymentId,
    amount: price.amount,
    item_name: price.itemName,
    item_description: price.itemDescription,
    custom_str1: plan,
  };

  if (price.recurring) {
    // Payfast refuses to set up a subscription on a merchant with no
    // passphrase. Catching it here gives a reason, rather than a dead end on
    // their site after the learner has already committed to paying.
    if (!config.passphrase) {
      throw new Error(
        'Payfast subscriptions require a passphrase. Set one on the Payfast dashboard under Settings, then set PAYFAST_PASSPHRASE to match.',
      );
    }
    fields.subscription_type = '1';
    fields.recurring_amount = price.amount;
    fields.frequency = String(FREQUENCY.monthly);
    // 0 is an indefinite subscription: it runs until the learner cancels.
    fields.cycles = '0';
  }

  for (const key of Object.keys(fields)) {
    const value = fields[key]!.trim();
    if (value === '') delete fields[key];
    else fields[key] = value;
  }

  fields.signature = signCheckout(fields, config.passphrase);
  return fields;
}
