import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const gradeEnum = pgEnum('grade', ['9', '10', '11', '12']);
export const planEnum = pgEnum('plan', ['none', 'monthly', 'annual']);
export const verificationEnum = pgEnum('verification', ['verified', 'partial', 'review']);
export const paymentStateEnum = pgEnum('payment_state', [
  'pending',
  'complete',
  'cancelled',
  'failed',
]);

/** A learner account. Email is the login; passwords are scrypt hashes. */
export const learners = pgTable(
  'learners',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    firstName: text('first_name').notNull().default(''),
    lastName: text('last_name').notNull().default(''),
    grade: gradeEnum('grade'),
    dateOfBirth: date('date_of_birth'),
    plan: planEnum('plan').notNull().default('none'),
    planExpires: timestamp('plan_expires', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('learners_email_idx').on(t.email)],
);

/**
 * Server-side sessions. The row id is a SHA-256 of the cookie token, so a
 * database leak does not hand over working sessions, and signing out or
 * revoking an account takes effect immediately.
 */
export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    learnerId: uuid('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('sessions_learner_idx').on(t.learnerId),
    index('sessions_expires_idx').on(t.expiresAt),
  ],
);

/**
 * The prototype's state blob.
 *
 * The front end still owns the shape of this data, so the server survives
 * prototype changes. Pull fields out into real columns as each part of the
 * learner journey settles.
 *
 * `jsonb` keeps values, array order and nesting exactly, but normalises object
 * key order — which the prototype does not depend on. Switch to `json` if a
 * byte-identical round trip ever matters, at the cost of indexing and querying.
 */
export const progress = pgTable('progress', {
  learnerId: uuid('learner_id')
    .primaryKey()
    .references(() => learners.id, { onDelete: 'cascade' }),
  data: jsonb('data').notNull().default(sql`'{}'::jsonb`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** One institution in the Applications Hub directory. */
export const universities = pgTable(
  'universities',
  {
    code: text('code').primaryKey(),
    name: text('name').notNull(),
    abbr: text('abbr').notNull(),
    site: text('site').notNull().default(''),
    location: text('location').notNull().default(''),
    dataYear: integer('data_year'),
    verification: verificationEnum('verification').notNull().default('review'),
    lastChecked: date('last_checked'),
    payload: jsonb('payload').notNull().default(sql`'{}'::jsonb`),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('universities_abbr_idx').on(t.abbr)],
);

/**
 * One checkout attempt.
 *
 * The row id is what Payfast echoes back as `m_payment_id`, so a notification
 * is tied to the learner and to the price we actually quoted — never to the
 * amount or the account the notification itself claims.
 */
export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    learnerId: uuid('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),
    plan: planEnum('plan').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    state: paymentStateEnum('state').notNull().default('pending'),
    /** True for the monthly plan, which Payfast renews on its own. */
    recurring: boolean('recurring').notNull().default(false),
    /** Payfast's subscription id, once a recurring payment has gone through. */
    token: text('token'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('payments_learner_idx').on(t.learnerId)],
);

/**
 * One ITN from Payfast, kept as a record of why access was granted.
 *
 * Payfast's own id is the primary key, and that is what makes the callback
 * idempotent: Payfast retries a notification until it gets a 200, and a
 * monthly subscription sends a fresh one every cycle against the same payment.
 */
export const paymentEvents = pgTable(
  'payment_events',
  {
    pfPaymentId: text('pf_payment_id').primaryKey(),
    paymentId: uuid('payment_id').references(() => payments.id, { onDelete: 'set null' }),
    status: text('status').notNull(),
    amountGross: numeric('amount_gross', { precision: 10, scale: 2 }),
    payload: jsonb('payload').notNull().default(sql`'{}'::jsonb`),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('payment_events_payment_idx').on(t.paymentId)],
);

export type Learner = typeof learners.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type NewLearner = typeof learners.$inferInsert;
export type Progress = typeof progress.$inferSelect;
export type University = typeof universities.$inferSelect;
