CREATE TYPE "public"."payment_state" AS ENUM('pending', 'complete', 'cancelled', 'failed');--> statement-breakpoint
CREATE TABLE "payment_events" (
	"pf_payment_id" text PRIMARY KEY NOT NULL,
	"payment_id" uuid,
	"status" text NOT NULL,
	"amount_gross" numeric(10, 2),
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"learner_id" uuid NOT NULL,
	"plan" "plan" NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"state" "payment_state" DEFAULT 'pending' NOT NULL,
	"recurring" boolean DEFAULT false NOT NULL,
	"token" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payment_events" ADD CONSTRAINT "payment_events_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_learner_id_learners_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payment_events_payment_idx" ON "payment_events" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "payments_learner_idx" ON "payments" USING btree ("learner_id");