import request from "supertest";
import app from "../../../../server/index.js";
import type { ApplicationsResponse } from "../../types.js";
import { seedApplicationsData } from "../../fixtures/application.fixtures.js";

describe("GET /applications", () => {
  it("should return seeded applications", async () => {
    const response = await request(app).get("/applications").expect(200);

    const body = response.body as ApplicationsResponse;

    expect(body.count).toBe(7);

    seedApplicationsData.forEach((expectedApp, index) => {
      const actualApp = body.applications[index];
      expect(actualApp.positionTitle).toBe(expectedApp.positionTitle);
      expect(actualApp.company).toBe(expectedApp.company);
      expect(actualApp.status).toBe(expectedApp.status);
      expect(actualApp.expectedSalary).toBe(expectedApp.expectedSalary);
    });
  });
});
