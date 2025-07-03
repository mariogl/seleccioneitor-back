CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewing', 'interview_scheduled', 'interviewed', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"position_title" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"cover_letter" text,
	"resume_url" varchar(500),
	"expected_salary" integer,
	"available_start_date" timestamp,
	"applied_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"internal_notes" text
);
