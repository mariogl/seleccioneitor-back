import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { ConvertNullablesIntoOptional } from "../../../types.js";

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "reviewing",
  "interview_scheduled",
  "interviewed",
  "accepted",
  "rejected",
  "withdrawn",
]);

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  positionTitle: varchar("position_title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  status: applicationStatusEnum("status").default("pending").notNull(),
  coverLetter: text("cover_letter"),
  resumeUrl: varchar("resume_url", { length: 500 }),
  expectedSalary: integer("expected_salary"), // in cents to avoid float precision issues
  availableStartDate: timestamp("available_start_date"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  internalNotes: text("internal_notes"),
});

export type ApplicationSchema = typeof applications.$inferSelect;
export type NewApplicationSchema = typeof applications.$inferInsert;
export type Application = ConvertNullablesIntoOptional<ApplicationSchema>;
export type NewApplication = ConvertNullablesIntoOptional<NewApplicationSchema>;

export interface ApplicationApiResponse {
  id: number;
  positionTitle: string;
  company: string;
  status:
    | "pending"
    | "reviewing"
    | "interview_scheduled"
    | "interviewed"
    | "accepted"
    | "rejected"
    | "withdrawn";
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  expectedSalary?: number;
  availableStartDate?: string;
  internalNotes?: string;
}
