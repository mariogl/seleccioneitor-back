import type { Company, NewCompany } from "../types.js";

export interface CompanyRepository {
  create(companyData: NewCompany): Promise<Company>;
}
