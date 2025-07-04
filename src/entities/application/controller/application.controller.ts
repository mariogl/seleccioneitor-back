import { Request, Response, NextFunction } from "express";
import { applicationService } from "../service/application.service.js";
import type { ApplicationsResponse, NewApplication } from "../types.js";
import { mapApplicationToApiResponse } from "../schema/mappers.js";

export class ApplicationController {
  async getAllApplications(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applications = await applicationService.getAllApplications();

      const response: ApplicationsResponse = {
        applications: applications.map(mapApplicationToApiResponse),
        count: applications.length,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Controller error:", error);
      next(error);
    }
  }

  async createApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applicationData = req.body as NewApplication;

      // Convert date strings to Date objects if present
      if (applicationData.availableStartDate) {
        applicationData.availableStartDate = new Date(
          applicationData.availableStartDate
        );
      }

      const newApplication = await applicationService.createApplication(
        applicationData
      );

      res.status(201).json(mapApplicationToApiResponse(newApplication));
    } catch (error) {
      console.error("Controller error:", error);
      next(error);
    }
  }
}

export const applicationController = new ApplicationController();
