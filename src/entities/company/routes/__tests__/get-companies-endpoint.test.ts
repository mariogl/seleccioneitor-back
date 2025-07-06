import request from "supertest";
import { seedCompanies, clearCompanies } from "../../fixtures/index.js";
import { seedCompaniesData } from "../../fixtures/company.fixtures.js";
import type { Company } from "../../types.js";
import app from "../../../../server/index.js";

describe("GET /companies", () => {
  beforeEach(async () => {
    await seedCompanies();
  });

  afterEach(async () => {
    await clearCompanies();
  });

  it("should return a list of companies ordered alphabetically", async () => {
    const response = await request(app).get("/companies").expect(200);

    const companies = response.body as Company[];

    expect(companies).toHaveLength(seedCompaniesData.length);

    const sortedCompanies = [...seedCompaniesData].sort((companyA, companyB) =>
      companyA.name.localeCompare(companyB.name)
    );

    sortedCompanies.forEach((expectedCompany, index) => {
      const actualCompany = companies[index];
      expect(actualCompany.name).toBe(expectedCompany.name);
      expect(actualCompany.id).toBe(expectedCompany.id);
    });
  });
});
