import { Request, Response, NextFunction } from "express";
import { applicationService } from "../service/application.service.js";
import type { ApplicationsResponse } from "../types.js";

export class ApplicationController {
  async getAllApplications(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applications = await applicationService.getAllApplications();

      const response: ApplicationsResponse = {
        data: applications,
        count: applications.length,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Controller error:", error);
      next(error);
    }
  }
}

export const applicationController = new ApplicationController();
