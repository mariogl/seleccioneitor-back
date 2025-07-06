import db from "../../../db/index.js";
import { applications } from "../schema/application.schema.js";
import type { Application, NewApplication } from "../types.js";
import type { ApplicationRepository } from "./application.repository.interface.js";
import { mapApplicationSchemaToApplication } from "../schema/mappers.js";
import { eq, desc } from "drizzle-orm";

export class DrizzleApplicationRepository implements ApplicationRepository {
  async findAll(): Promise<Application[]> {
    const records = await db.query.applications.findMany({
      with: {
        company: true,
      },
      orderBy: desc(applications.appliedAt),
    });

    return records.map((record) => {
      return mapApplicationSchemaToApplication(record, record.company);
    });
  }

  async findById(id: number): Promise<Application | null> {
    const record = await db.query.applications.findFirst({
      where: eq(applications.id, id),
      with: {
        company: true,
      },
    });

    return record
      ? mapApplicationSchemaToApplication(record, record.company)
      : null;
  }

  async create(applicationData: NewApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(applicationData)
      .returning();

    const applicationWithCompany = await db.query.applications.findFirst({
      where: eq(applications.id, newApplication.id),
      with: {
        company: true,
      },
    });

    if (!applicationWithCompany?.company) {
      throw new Error("Failed to create application or retrieve company");
    }

    return mapApplicationSchemaToApplication(
      applicationWithCompany,
      applicationWithCompany.company
    );
  }

  async delete(id: number): Promise<void> {
    await db.delete(applications).where(eq(applications.id, id));
  }
}
