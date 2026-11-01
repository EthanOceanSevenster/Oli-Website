CREATE TYPE "public"."grade" AS ENUM('9', '10', '11', '12');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('none', 'monthly', 'annual');--> statement-breakpoint
CREATE TYPE "public"."verification" AS ENUM('verified', 'partial', 'review');--> statement-breakpoint
CREATE TABLE "learners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text DEFAULT '' NOT NULL,
	"last_name" text DEFAULT '' NOT NULL,
	"grade" "grade",
	"date_of_birth" date,
	"plan" "plan" DEFAULT 'none' NOT NULL,
	"plan_expires" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "learners_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"learner_id" uuid PRIMARY KEY NOT NULL,
	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"learner_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "universities" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"abbr" text NOT NULL,
	"site" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"data_year" integer,
	"verification" "verification" DEFAULT 'review' NOT NULL,
	"last_checked" date,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_learner_id_learners_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_learner_id_learners_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "learners_email_idx" ON "learners" USING btree ("email");--> statement-breakpoint
CREATE INDEX "sessions_learner_idx" ON "sessions" USING btree ("learner_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "universities_abbr_idx" ON "universities" USING btree ("abbr");