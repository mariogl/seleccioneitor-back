import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { applications } from "../../application/schema/application.schema.js";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  website: varchar("website", { length: 500 }),
  location: varchar("location", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  notes: text("notes"),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  applications: many(applications),
}));

export type CompanySchema = typeof companies.$inferSelect;
export type NewCompanySchema = typeof companies.$inferInsert;
