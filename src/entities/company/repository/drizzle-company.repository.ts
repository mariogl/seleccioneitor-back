import db from "../../../db/index.js";
import { companies } from "../schema/company.schema.js";
import type { Company, NewCompany } from "../types.js";
import type { CompanyRepository } from "./company.repository.interface.js";

function mapCompanySchemaToCompany(
  companySchema: typeof companies.$inferSelect
): Company {
  return {
    id: companySchema.id,
    name: companySchema.name,
    createdAt: companySchema.createdAt,
    updatedAt: companySchema.updatedAt,
    ...(companySchema.description !== null && {
      description: companySchema.description,
    }),
    ...(companySchema.website !== null && { website: companySchema.website }),
    ...(companySchema.location !== null && {
      location: companySchema.location,
    }),
    ...(companySchema.email !== null && { email: companySchema.email }),
    ...(companySchema.phone !== null && { phone: companySchema.phone }),
    ...(companySchema.notes !== null && { notes: companySchema.notes }),
  };
}

export class DrizzleCompanyRepository implements CompanyRepository {
  async create(companyData: NewCompany): Promise<Company> {
    const [newCompany] = await db
      .insert(companies)
      .values(companyData)
      .returning();

    return mapCompanySchemaToCompany(newCompany);
  }
}
