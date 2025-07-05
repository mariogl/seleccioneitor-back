import db from "../../../db/index.js";
import { applications } from "../schema/application.schema.js";
import type { Application, NewApplication } from "../types.js";
import type { ApplicationRepository } from "./application.repository.interface.js";
import { mapApplicationSchemaToApplication } from "../schema/mappers.js";
import { eq, desc } from "drizzle-orm";

export class DrizzleApplicationRepository implements ApplicationRepository {
  async findAll(): Promise<Application[]> {
    const records = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.appliedAt));

    return records.map(mapApplicationSchemaToApplication);
  }

  async findById(id: number): Promise<Application | null> {
    const [record] = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id));
    return record ? mapApplicationSchemaToApplication(record) : null;
  }

  async create(applicationData: NewApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(applicationData)
      .returning();
    return mapApplicationSchemaToApplication(newApplication);
  }

  async delete(id: number): Promise<void> {
    await db.delete(applications).where(eq(applications.id, id));
  }
}
