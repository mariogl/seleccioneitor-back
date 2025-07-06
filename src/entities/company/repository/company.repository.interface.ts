import type { Company, NewCompany } from "../types.js";

export interface CompanyRepository {
  findAll(): Promise<Company[]>;
  create(companyData: NewCompany): Promise<Company>;
}
