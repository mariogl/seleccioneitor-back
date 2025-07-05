import request from "supertest";
import app from "../../../../server/index.js";
import type { ApplicationsResponse } from "../../types.js";

describe("DELETE /applications/:id", () => {
  it("should delete an application", async () => {
    const getResponse = await request(app).get("/applications").expect(200);
    const initialBody = getResponse.body as ApplicationsResponse;
    const initialCount = initialBody.count;

    if (initialCount === 0) {
      return;
    }

    const firstApplication = initialBody.applications[0];

    const deleteResponse = await request(app)
      .delete(`/applications/${firstApplication.id}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: "Application deleted successfully",
    });

    const afterDeleteResponse = await request(app)
      .get("/applications")
      .expect(200);
    const afterDeleteBody = afterDeleteResponse.body as ApplicationsResponse;

    expect(afterDeleteBody.count).toBe(initialCount - 1);
    expect(
      afterDeleteBody.applications.find((app) => app.id === firstApplication.id)
    ).toBeUndefined();
  });

  it("should return 400 for invalid ID", async () => {
    const response = await request(app)
      .delete("/applications/invalid")
      .expect(400);

    expect(response.body).toEqual({
      error: "Invalid ID",
    });
  });

  it("should return 400 for non-numeric ID", async () => {
    const response = await request(app).delete("/applications/abc").expect(400);

    expect(response.body).toEqual({
      error: "Invalid ID",
    });
  });
});
