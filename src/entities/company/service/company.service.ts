import type { Company, NewCompany } from "../types.js";
import type { CompanyRepository } from "../repository/company.repository.interface.js";
import { DrizzleCompanyRepository } from "../repository/drizzle-company.repository.js";
import { InternalServerError, ValidationError } from "../../../errors/index.js";

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(companyData: NewCompany): Promise<Company> {
    try {
      if (!companyData.name?.trim()) {
        throw new ValidationError("Company name is required", "name");
      }

      return await this.companyRepository.create(companyData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      console.error("Error creating company:", error);
      throw new InternalServerError("Failed to create company");
    }
  }
}

export const companyService = new CompanyService(
  new DrizzleCompanyRepository()
);
