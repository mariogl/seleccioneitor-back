import request from "supertest";
import app from "../../../../server/index.js";
import type { Application } from "../../types.js";
import { createApplicationJsonFixture } from "../../fixtures/application.fixtures.js";
import { clearApplications } from "../../fixtures/index.js";
import {
  seedCompanies,
  clearCompanies,
} from "../../../company/fixtures/index.js";

describe("POST /applications", () => {
  beforeEach(async () => {
    await seedCompanies();
  });

  afterEach(async () => {
    await clearApplications();
    await clearCompanies();
  });

  it("should create a new application", async () => {
    const newApplicationData = createApplicationJsonFixture({
      positionTitle: "Desarrollador TypeScript",
      companyId: 1,
      availableStartDate: "2025-09-01T00:00:00.000Z",
      internalNotes: "Nueva aplicación creada via API",
    });

    const response = await request(app)
      .post("/applications")
      .send(newApplicationData)
      .expect(201);

    const createdApplication = response.body as Application;

    expect(createdApplication.positionTitle).toBe(
      newApplicationData.positionTitle
    );
    expect(createdApplication.company.id).toBe(newApplicationData.companyId);
    expect(createdApplication.status).toBe(newApplicationData.status);
    expect(createdApplication.expectedSalary).toBe(
      newApplicationData.expectedSalary
    );
  });

  it("should create application with only required fields", async () => {
    const minimalApplicationData = createApplicationJsonFixture({
      positionTitle: "Backend Developer",
      companyId: 2,
    });

    const response = await request(app)
      .post("/applications")
      .send(minimalApplicationData)
      .expect(201);

    const createdApplication = response.body as Application;

    expect(createdApplication.positionTitle).toBe(
      minimalApplicationData.positionTitle
    );
    expect(createdApplication.company.id).toBe(
      minimalApplicationData.companyId
    );
    expect(createdApplication.status).toBe("pending");
  });
});
