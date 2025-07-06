import { Request, Response, NextFunction } from "express";
import { companyService } from "../service/company.service.js";
import type { NewCompany } from "../types.js";

export class CompanyController {
  async createCompany(
    req: Request<Record<string, unknown>, Record<string, unknown>, NewCompany>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companyData = req.body;

      const newCompany = await companyService.createCompany(companyData);

      res.status(201).json(newCompany);
    } catch (error) {
      next(error);
    }
  }

  async getAllCompanies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const companies = await companyService.getAllCompanies();
      res.status(200).json(companies);
    } catch (error) {
      next(error);
    }
  }
}

export const companyController = new CompanyController();
