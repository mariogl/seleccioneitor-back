import { ConvertNullablesIntoOptional } from "../../types.js";
import type { Company } from "../company/types.js";
import {
  ApplicationSchema,
  NewApplicationSchema,
} from "./schema/application.schema.js";

export type Application = Omit<
  ConvertNullablesIntoOptional<ApplicationSchema>,
  "companyId"
> & {
  company: Company;
};

export type NewApplication = Omit<
  ConvertNullablesIntoOptional<NewApplicationSchema>,
  "companyId"
> & {
  companyId: number;
};

export interface ApplicationApiResponse {
  id: number;
  positionTitle: string;
  company: Company;
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

export interface ApplicationsResponse {
  applications: ApplicationApiResponse[];
  count: number;
}
