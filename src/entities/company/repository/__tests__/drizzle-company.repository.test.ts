import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { DrizzleCompanyRepository } from "../drizzle-company.repository.js";
import { createCompanyFixture } from "../../fixtures/company.fixtures.js";
import { clearCompanies } from "../../fixtures/index.js";

describe("DrizzleCompanyRepository", () => {
  let repository: DrizzleCompanyRepository;

  beforeEach(() => {
    repository = new DrizzleCompanyRepository();
  });

  afterEach(async () => {
    await clearCompanies();
  });

  it("should create a company", async () => {
    const companyData = createCompanyFixture({
      name: "Test Company",
      description: "A test company",
    });

    const createdCompany = await repository.create(companyData);

    expect(createdCompany.id).toBeDefined();
    expect(createdCompany.name).toBe("Test Company");
    expect(createdCompany.description).toBe("A test company");
    expect(createdCompany.createdAt).toBeDefined();
    expect(createdCompany.updatedAt).toBeDefined();
  });
});
