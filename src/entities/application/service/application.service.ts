import type { Application, NewApplication } from "../types.js";
import type { ApplicationRepository } from "../repository/application.repository.interface.js";
import { DrizzleApplicationRepository } from "../repository/drizzle-application.repository.js";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../../../errors/index.js";

export class ApplicationService {
  constructor(private applicationRepository: ApplicationRepository) {}

  async getAllApplications(): Promise<Application[]> {
    try {
      return await this.applicationRepository.findAll();
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw new InternalServerError("Failed to fetch applications");
    }
  }

  async createApplication(
    applicationData: NewApplication
  ): Promise<Application> {
    try {
      if (!applicationData.positionTitle?.trim()) {
        throw new ValidationError(
          "Position title is required",
          "positionTitle"
        );
      }

      if (!applicationData.company?.trim()) {
        throw new ValidationError("Company is required", "company");
      }

      return await this.applicationRepository.create(applicationData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      console.error("Error creating application:", error);
      throw new InternalServerError("Failed to create application");
    }
  }

  async deleteApplication(id: number): Promise<void> {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new ValidationError("Invalid application ID", "id");
      }

      const application = await this.applicationRepository.findById(id);

      if (!application) {
        throw new NotFoundError(`Application with id ${id} not found`);
      }

      await this.applicationRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      }

      console.error("Error deleting application:", error);
      throw new InternalServerError("Failed to delete application");
    }
  }
}

export const applicationService = new ApplicationService(
  new DrizzleApplicationRepository()
);
