import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { CompanyService } from "../company.service.js";
import { DrizzleCompanyRepository } from "../../repository/drizzle-company.repository.js";
import { createCompanyFixture } from "../../fixtures/company.fixtures.js";
import { clearCompanies } from "../../fixtures/index.js";
import { ValidationError } from "../../../../errors/index.js";

describe("CompanyService", () => {
  let service: CompanyService;

  beforeEach(() => {
    const repository = new DrizzleCompanyRepository();
    service = new CompanyService(repository);
  });

  afterEach(async () => {
    await clearCompanies();
  });

  it("should create a company successfully", async () => {
    const companyData = createCompanyFixture({
      name: "Test Service Company",
      description: "Company created via service",
    });

    const createdCompany = await service.createCompany(companyData);

    expect(createdCompany.id).toBeDefined();
    expect(createdCompany.name).toBe("Test Service Company");
    expect(createdCompany.description).toBe("Company created via service");
  });

  it("should throw ValidationError when name is empty", async () => {
    const companyData = createCompanyFixture({
      name: "",
      description: "Company without name",
    });

    await expect(service.createCompany(companyData)).rejects.toThrow(
      ValidationError
    );
  });

  it("should throw ValidationError when name is only whitespace", async () => {
    const companyData = createCompanyFixture({
      name: "   ",
      description: "Company with whitespace name",
    });

    await expect(service.createCompany(companyData)).rejects.toThrow(
      ValidationError
    );
  });
});
