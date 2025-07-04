export {
  Application,
  NewApplication,
  ApplicationApiResponse,
} from "./schema/application.schema.js";
import type { ApplicationApiResponse } from "./schema/application.schema.js";

export interface ApplicationsResponse {
  applications: ApplicationApiResponse[];
  count: number;
}
