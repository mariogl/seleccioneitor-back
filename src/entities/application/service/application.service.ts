import type { Application } from "../types.js";
import type { ApplicationRepository } from "../repository/application.repository.interface.js";
import { DrizzleApplicationRepository } from "../repository/drizzle-application.repository.js";

export class ApplicationService {
  constructor(private applicationRepository: ApplicationRepository) {}

  async getAllApplications(): Promise<Application[]> {
    try {
      return await this.applicationRepository.findAll();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw new Error("Failed to fetch applications");
    }
  }
}

export const applicationService = new ApplicationService(
  new DrizzleApplicationRepository()
);
