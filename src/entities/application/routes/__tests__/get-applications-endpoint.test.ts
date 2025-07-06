import request from "supertest";
import app from "../../../../server/index.js";
import type { ApplicationsResponse } from "../../types.js";
import { seedApplicationsData } from "../../fixtures/application.fixtures.js";
import { seedApplications, clearApplications } from "../../fixtures/index.js";
import {
  seedCompanies,
  clearCompanies,
} from "../../../company/fixtures/index.js";

describe("GET /applications", () => {
  beforeEach(async () => {
    await seedCompanies();
    await seedApplications();
  });

  afterEach(async () => {
    await clearApplications();
    await clearCompanies();
  });

  it("should return seeded applications", async () => {
    const response = await request(app).get("/applications").expect(200);

    const body = response.body as ApplicationsResponse;

    expect(body.count).toBe(seedApplicationsData.length);

    seedApplicationsData.forEach((expectedApp) => {
      const foundApp = body.applications.find(
        (app) =>
          app.positionTitle === expectedApp.positionTitle &&
          app.company.id === expectedApp.companyId
      );

      expect(foundApp).toBeDefined();
      expect(foundApp?.status).toBe(expectedApp.status);
      expect(foundApp?.expectedSalary).toBe(expectedApp.expectedSalary);
    });
  });
});
