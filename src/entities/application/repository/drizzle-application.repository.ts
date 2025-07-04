import db from "../../../db/index.js";
import { applications } from "../schema/application.schema.js";
import type { Application, NewApplication } from "../types.js";
import type { ApplicationRepository } from "./application.repository.interface.js";
import { mapApplicationSchemaToApplication } from "../schema/mappers.js";

export class DrizzleApplicationRepository implements ApplicationRepository {
  async findAll(): Promise<Application[]> {
    const records = await db.select().from(applications);
    return records.map(mapApplicationSchemaToApplication);
  }

  async create(applicationData: NewApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(applicationData)
      .returning();
    return mapApplicationSchemaToApplication(newApplication);
  }
}
