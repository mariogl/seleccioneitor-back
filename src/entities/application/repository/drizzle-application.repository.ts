import db from "../../../db/index.js";
import { applications } from "../schema/application.schema.js";
import type { Application } from "../types.js";
import type { ApplicationRepository } from "./application.repository.interface.js";

export class DrizzleApplicationRepository implements ApplicationRepository {
  async findAll(): Promise<Application[]> {
    return await db.select().from(applications);
  }
}
