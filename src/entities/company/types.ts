import { ConvertNullablesIntoOptional } from "../../types.js";
import { CompanySchema, NewCompanySchema } from "./schema/company.schema.js";

export type Company = ConvertNullablesIntoOptional<CompanySchema>;
export type NewCompany = ConvertNullablesIntoOptional<NewCompanySchema>;

export interface CompanyApiResponse {
  id: number;
  name: string;
  description?: string;
  website?: string;
  location?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
