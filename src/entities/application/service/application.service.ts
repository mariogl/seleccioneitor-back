import type { Application, NewApplication } from "../types.js";
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

  async createApplication(
    applicationData: NewApplication
  ): Promise<Application> {
    try {
      return await this.applicationRepository.create(applicationData);
    } catch (error) {
      console.error("Error creating application:", error);
      throw new Error("Failed to create application");
    }
  }

  async deleteApplication(id: number): Promise<void> {
    try {
      await this.applicationRepository.delete(id);
    } catch (error) {
      console.error("Error deleting application:", error);
      throw new Error("Failed to delete application");
    }
  }
}

export const applicationService = new ApplicationService(
  new DrizzleApplicationRepository()
);
