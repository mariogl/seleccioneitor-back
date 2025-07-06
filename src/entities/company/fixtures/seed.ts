import db from "../../../db/index.js";
import { companies } from "../schema/company.schema.js";
import { seedCompaniesData } from "./company.fixtures.js";

export const seedCompanies = async () => {
  for await (const company of seedCompaniesData) {
    await db.insert(companies).values(company);
  }
};

export const clearCompanies = async () => {
  await db.delete(companies);
};
