-- Add new company_id column
ALTER TABLE "applications" ADD COLUMN "company_id" integer NOT NULL DEFAULT 1;
--> statement-breakpoint
-- Drop old company column
ALTER TABLE "applications" DROP COLUMN "company";
--> statement-breakpoint
-- Add foreign key constraint
ALTER TABLE "applications" ADD CONSTRAINT "applications_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
