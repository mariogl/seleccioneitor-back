import type { Application, NewApplication } from "../types.js";

export interface ApplicationRepository {
  findAll(): Promise<Application[]>;
  findById(id: number): Promise<Application | null>;
  create(applicationData: NewApplication): Promise<Application>;
  delete(id: number): Promise<void>;
}
