export { Application, NewApplication } from "./schema/application.schema.js";
import type { Application } from "./schema/application.schema.js";

export interface ApplicationsResponse {
  applications: Application[];
  count: number;
}
