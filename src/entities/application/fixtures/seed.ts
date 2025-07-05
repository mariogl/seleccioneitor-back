import db from "../../../db/index.js";
import { applications } from "../schema/application.schema.js";
import { seedApplicationsData } from "./application.fixtures.js";
import { sql } from "drizzle-orm";

export const seedApplications = async () => {
  await db.insert(applications).values(seedApplicationsData);
};

export const clearApplications = async () => {
  await db.execute(sql`TRUNCATE TABLE applications RESTART IDENTITY CASCADE`);
};
