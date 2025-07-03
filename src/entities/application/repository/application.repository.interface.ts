import type { Application, NewApplication } from "../types.js";

export interface ApplicationRepository {
  findAll(): Promise<Application[]>;
  create(applicationData: NewApplication): Promise<Application>;
}
