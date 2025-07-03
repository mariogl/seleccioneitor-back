import type { Application } from "../types.js";

export interface ApplicationRepository {
  findAll(): Promise<Application[]>;
}
