import request from "supertest";
import app from "../../../../server/index.js";
import type { Application, ApplicationsResponse } from "../../types.js";
import { createApplicationJsonFixture } from "../../fixtures/application.fixtures.js";
import { clearApplications } from "../../fixtures/index.js";
import {
  seedCompanies,
  clearCompanies,
} from "../../../company/fixtures/index.js";

describe("DELETE /applications/:id", () => {
  beforeEach(async () => {
    await seedCompanies();
  });

  afterEach(async () => {
    await clearApplications();
    await clearCompanies();
  });

  it("should delete an application", async () => {
    const newApplicationData = createApplicationJsonFixture({
      positionTitle: "Test Developer Position",
      companyId: 1, // Test Company for Deletion
    });

    const createResponse = await request(app)
      .post("/applications")
      .send(newApplicationData)
      .expect(201);

    const createdApplication = createResponse.body as Application;

    const deleteResponse = await request(app)
      .delete(`/applications/${createdApplication.id}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: "Application deleted successfully",
    });

    const afterDeleteResponse = await request(app)
      .get("/applications")
      .expect(200);
    const afterDeleteBody = afterDeleteResponse.body as ApplicationsResponse;

    expect(
      afterDeleteBody.applications.find(
        (app) => app.id === createdApplication.id
      )
    ).toBeUndefined();
  });

  it("should return 400 for invalid ID", async () => {
    const response = await request(app)
      .delete("/applications/invalid")
      .expect(400);

    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Invalid ID");
  });
});
