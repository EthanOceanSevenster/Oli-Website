/**
 * Checks the Payfast integration without moving any money.
 *
 *   npx tsx scripts/test-payfast.ts
 *
 * The signature is the part worth proving: getting it wrong shows up as a
 * dead end on Payfast's site rather than as an error here. Payfast's shared
 * sandbox merchant cannot settle it — anyone can log into that account and
 * change its passphrase, and at the time of writing even Payfast's own SDK
 * example is rejected by it. So the proof here is differential instead: our
 * signature is compared against a faithful port of `Auth::generateSignature`
 * from Payfast's PHP SDK, which is what their production integrations use.
 *
 * With real credentials in the environment, the live check runs too.
 */

process.env.PAYFAST_SANDBOX ??= 'true';

async function run() {
  const { createHash } = await import('node:crypto');
  const {
    CHECKOUT_FIELD_ORDER,
    checkoutFields,
    checkoutParamString,
    isPayfastIp,
    parseItn,
    payfastConfig,
    verifyItnSignature,
  } = await import('../lib/payfast');

  let passed = 0;
  const failures: string[] = [];

  function check(label: string, ok: boolean, detail?: unknown) {
    if (ok) {
      passed += 1;
      console.log(`  PASS  ${label}`);
    } else {
      failures.push(label);
      console.log(`  FAIL  ${label}${detail === undefined ? '' : `  -- ${JSON.stringify(detail)}`}`);
    }
  }

  const config = payfastConfig()!;
  const md5 = (value: string) => createHash('md5').update(value).digest('hex');

  /** PHP's `urlencode`. */
  const php = (v: string) =>
    encodeURIComponent(v)
      .replace(/[!'()*~]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
      .replace(/%20/g, '+');

  console.log(`\nPayfast — merchant ${config.merchantId}${config.sandbox ? ' (sandbox)' : ''}\n`);

  /* ----------------------------------------------- field construction -- */

  console.log('CHECKOUT FIELDS');

  const details = {
    config,
    origin: 'https://pathwayexplore.com',
    firstName: 'Thandeka',
    lastName: "O'Brien",
    email: 'learner@example.com',
  };

  const annual = checkoutFields({
    ...details,
    paymentId: '11111111-2222-3333-4444-555555555555',
    plan: 'annual',
  });
  const monthly = checkoutFields({
    ...details,
    paymentId: '66666666-7777-8888-9999-000000000000',
    plan: 'monthly',
    lastName: '',
  });

  check('annual is R199.00', annual.amount === '199.00', annual.amount);
  check('monthly is R20.00', monthly.amount === '20.00', monthly.amount);
  check('annual is a once-off, not a subscription', annual.subscription_type === undefined);
  check('monthly is a subscription', monthly.subscription_type === '1');
  check('monthly bills monthly', monthly.frequency === '3', monthly.frequency);
  check('monthly runs until cancelled', monthly.cycles === '0', monthly.cycles);
  check('monthly renews at the same price', monthly.recurring_amount === '20.00');
  check('blank fields are left out entirely', !('name_last' in monthly), Object.keys(monthly));
  check('the plan rides along for the callback', annual.custom_str1 === 'annual');
  check(
    'notify_url points at the callback',
    annual.notify_url === 'https://pathwayexplore.com/api/payfast/notify',
    annual.notify_url,
  );
  check(
    'the cancel link is distinguishable from the return link',
    annual.cancel_url !== annual.return_url && annual.cancel_url.includes('cancelled=1'),
  );
  check('an apostrophe is escaped the way PHP urlencode does it', checkoutParamString(annual).includes('name_last=O%27Brien'));
  check(
    'cycles=0 is posted but kept out of the signature, as PHP empty() requires',
    !checkoutParamString(monthly).includes('cycles=') && monthly.cycles === '0',
    checkoutParamString(monthly),
  );

  const order = Object.keys(annual).filter((k) => k !== 'signature');
  check(
    'fields are signed in the SDK’s order, not alphabetical',
    JSON.stringify(order) === JSON.stringify(CHECKOUT_FIELD_ORDER.filter((k) => order.includes(k))),
    order,
  );

  let threw = false;
  try {
    checkoutFields({ ...details, paymentId: 'x', plan: 'monthly', config: { ...config, passphrase: '' } });
  } catch {
    threw = true;
  }
  check('a subscription without a passphrase is refused up front', threw);

  /* --------------------------------- against Payfast's own PHP SDK --- */

  console.log('\nAGREEMENT WITH PAYFAST’S PHP SDK');

  /** A faithful port of Auth::generateSignature from payfast-php-sdk. */
  function sdkSignature(data: Record<string, string>, passPhrase: string): string {
    const allowed = [...CHECKOUT_FIELD_ORDER] as string[];
    const attributes: Array<[string, string]> = Object.entries(data).filter(([key]) =>
      allowed.includes(key),
    );
    // The SDK appends the passphrase as a new key, so it lands last whatever
    // position the allow-list gives it.
    if (passPhrase !== '') attributes.push(['passphrase', passPhrase.trim()]);

    let out = '';
    for (const [key, value] of attributes) {
      // PHP's !empty(), which skips '' and '0'.
      if (value !== '' && value !== '0') out += `${key}=${php(value.trim())}&`;
    }
    return md5(out.slice(0, -1));
  }

  for (const [label, fields] of [
    ['a once-off payment', annual],
    ['a subscription', monthly],
  ] as const) {
    const { signature, ...rest } = fields;
    check(
      `our signature matches the SDK's for ${label}`,
      signature === sdkSignature(rest, config.passphrase),
      { ours: signature, sdk: sdkSignature(rest, config.passphrase) },
    );
  }

  const awkward = checkoutFields({
    ...details,
    paymentId: '99999999-8888-7777-6666-555555555555',
    plan: 'annual',
    firstName: 'Ann (Annie)',
    lastName: 'van der Merwe*',
    email: 'a.b+tag@example.co.za',
  });
  const { signature: awkwardSig, ...awkwardRest } = awkward;
  check(
    'they still agree on names with brackets, stars and plus signs',
    awkwardSig === sdkSignature(awkwardRest, config.passphrase),
  );

  /* ------------------------------------------------- ITN verification -- */

  console.log('\nITN VERIFICATION');

  /** Builds and signs a notification the way Payfast's server does. */
  function itnBody(fields: Record<string, string>, passphrase: string): string {
    // Payfast includes every posted field, empty ones included, up to the
    // signature — see Notification::dataToString in their SDK.
    const base = Object.entries(fields)
      .map(([k, v]) => `${k}=${php(v)}`)
      .join('&');
    return `${base}&signature=${md5(passphrase ? `${base}&passphrase=${php(passphrase)}` : base)}`;
  }

  const notification = {
    m_payment_id: '11111111-2222-3333-4444-555555555555',
    pf_payment_id: '1089250',
    payment_status: 'COMPLETE',
    item_name: 'PATHWAY Annual',
    item_description: '',
    amount_gross: '199.00',
    amount_fee: '-4.60',
    amount_net: '194.40',
    custom_str1: 'annual',
    name_first: 'Thandeka',
    name_last: "O'Brien",
    email_address: 'learner@example.com',
    merchant_id: config.merchantId,
  };

  const good = itnBody(notification, config.passphrase);
  check('a correctly signed notification is accepted', verifyItnSignature(good, parseItn(good), config.passphrase));

  const tampered = good.replace('amount_gross=199.00', 'amount_gross=1.00');
  check(
    'raising the amount after signing is rejected',
    !verifyItnSignature(tampered, parseItn(tampered), config.passphrase),
  );

  const shuffled = good.split('&');
  const reordered = [shuffled[1], shuffled[0], ...shuffled.slice(2)].join('&');
  check(
    'a notification whose fields were shuffled after signing is rejected',
    !verifyItnSignature(reordered, parseItn(reordered), config.passphrase),
  );

  const forged = itnBody(notification, 'not-the-passphrase');
  check(
    'a notification signed without our passphrase is rejected',
    !verifyItnSignature(forged, parseItn(forged), config.passphrase),
  );

  const unsigned = Object.entries(notification)
    .map(([k, v]) => `${k}=${php(v)}`)
    .join('&');
  check('an unsigned notification is rejected', !verifyItnSignature(unsigned, parseItn(unsigned), config.passphrase));

  check(
    'an empty body is rejected',
    !verifyItnSignature('', parseItn(''), config.passphrase),
  );

  check("values survive parsing", parseItn(good).find(([k]) => k === 'name_last')?.[1] === "O'Brien");
  check('empty fields survive parsing', parseItn(good).some(([k, v]) => k === 'item_description' && v === ''));

  /* ----------------------------------------------------- source address -- */

  console.log('\nSOURCE ADDRESS');

  const addresses: Array<[string, boolean]> = [
    ['197.97.145.144', true],
    ['197.97.145.150', true],
    ['197.97.145.159', true],
    ['197.97.145.160', false],
    ['197.97.145.143', false],
    ['41.74.179.192', true],
    ['41.74.179.223', true],
    ['41.74.179.224', false],
    ['102.216.36.10', true],
    ['102.216.36.100', false],
    ['102.216.36.130', true],
    ['144.126.193.139', true],
    ['144.126.193.140', false],
    ['::ffff:197.97.145.150', true],
    ['8.8.8.8', false],
    ['not-an-ip', false],
    ['', false],
    ['197.97.145.300', false],
  ];
  for (const [ip, expected] of addresses) {
    check(`${ip || '(empty)'} ${expected ? 'is' : 'is not'} Payfast`, isPayfastIp(ip) === expected);
  }

  /* ------------------------------------------------------- live check -- */

  console.log('\nLIVE CHECK');

  if (!process.env.PAYFAST_MERCHANT_ID) {
    console.log(
      '  SKIP  Payfast rejects its own SDK example on the shared sandbox, so a\n' +
        '        live signature check needs real credentials. Set PAYFAST_MERCHANT_ID,\n' +
        '        PAYFAST_MERCHANT_KEY and PAYFAST_PASSPHRASE to run it.',
    );
  } else {
    const body =
      CHECKOUT_FIELD_ORDER.filter((n) => (annual[n] ?? '') !== '')
        .map((n) => `${n}=${encodeURIComponent(annual[n]!)}`)
        .join('&') + `&signature=${annual.signature}`;

    const response = await fetch(`${config.processUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      redirect: 'manual',
      signal: AbortSignal.timeout(20_000),
    });
    const text = (await response.text())
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    check('Payfast accepts a signature we generated', !/is invalid|does not match/i.test(text), text.slice(0, 160));
  }

  /* ----------------------------------------------------------- verdict -- */

  console.log('\n' + '='.repeat(60));
  if (failures.length) {
    console.log(`${failures.length} FAILED, ${passed} passed`);
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
  console.log(`All ${passed} checks passed.`);
}

run().catch((error) => {
  console.error('Test run crashed:', error);
  process.exit(1);
});

export {};
