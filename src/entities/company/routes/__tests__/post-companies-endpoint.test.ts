import request from "supertest";
import app from "../../../../server/index.js";
import type { Company } from "../../types.js";
import { createCompanyFixture } from "../../fixtures/company.fixtures.js";
import { clearCompanies } from "../../fixtures/index.js";

describe("POST /companies", () => {
  afterEach(async () => {
    await clearCompanies();
  });

  it("should create a new company", async () => {
    const newCompanyData = createCompanyFixture({
      name: "Test Company API",
      description: "Company created via API endpoint",
      website: "https://testcompany.com",
      location: "Barcelona, España",
      email: "test@testcompany.com",
      phone: "+34 900 000 000",
      notes: "Test company for endpoint testing",
    });

    const response = await request(app)
      .post("/companies")
      .send(newCompanyData)
      .expect(201);

    const createdCompany = response.body as Company;

    expect(createdCompany.id).toBeDefined();
    expect(createdCompany.name).toBe("Test Company API");
    expect(createdCompany.description).toBe("Company created via API endpoint");
    expect(createdCompany.website).toBe("https://testcompany.com");
    expect(createdCompany.location).toBe("Barcelona, España");
    expect(createdCompany.email).toBe("test@testcompany.com");
    expect(createdCompany.phone).toBe("+34 900 000 000");
    expect(createdCompany.notes).toBe("Test company for endpoint testing");
    expect(createdCompany.createdAt).toBeDefined();
    expect(createdCompany.updatedAt).toBeDefined();
  });

  it("should return 400 when name is missing", async () => {
    const invalidCompanyData = createCompanyFixture({
      name: "",
      description: "Company without name",
    });

    const response = await request(app)
      .post("/companies")
      .send(invalidCompanyData)
      .expect(400);

    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Company name is required");
  });

  it("should create a company with only required fields", async () => {
    const minimalCompanyData = {
      name: "Minimal Company",
    };

    const response = await request(app)
      .post("/companies")
      .send(minimalCompanyData)
      .expect(201);

    const createdCompany = response.body as Company;

    expect(createdCompany.id).toBeDefined();
    expect(createdCompany.name).toBe("Minimal Company");
    expect(createdCompany.createdAt).toBeDefined();
    expect(createdCompany.updatedAt).toBeDefined();
  });
});
