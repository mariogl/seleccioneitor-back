import request from "supertest";
import app from "../../../../server/index.js";
import type { Application } from "../../types.js";
import { createApplicationJsonFixture } from "../../fixtures/application.fixtures.js";

describe("POST /applications", () => {
  it("should create a new application", async () => {
    const newApplicationData = createApplicationJsonFixture({
      positionTitle: "Desarrollador TypeScript",
      company: "Nueva Empresa SL",
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
    expect(createdApplication.company).toBe(newApplicationData.company);
    expect(createdApplication.status).toBe(newApplicationData.status);
    expect(createdApplication.expectedSalary).toBe(
      newApplicationData.expectedSalary
    );
  });

  it("should create application with only required fields", async () => {
    const minimalApplicationData = createApplicationJsonFixture({
      positionTitle: "Backend Developer",
      company: "Minimal Corp",
    });

    const response = await request(app)
      .post("/applications")
      .send(minimalApplicationData)
      .expect(201);

    const createdApplication = response.body as Application;

    expect(createdApplication.positionTitle).toBe(
      minimalApplicationData.positionTitle
    );
    expect(createdApplication.company).toBe(minimalApplicationData.company);
    expect(createdApplication.status).toBe("pending");
  });
});
