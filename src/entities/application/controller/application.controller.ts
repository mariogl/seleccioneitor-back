import { Request, Response, NextFunction } from "express";
import { applicationService } from "../service/application.service.js";

export class ApplicationController {
  async getAllApplications(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applications = await applicationService.getAllApplications();

      res.status(200).json({
        data: applications,
        count: applications.length,
      });
    } catch (error) {
      console.error("Controller error:", error);
      next(error);
    }
  }
}

export const applicationController = new ApplicationController();
