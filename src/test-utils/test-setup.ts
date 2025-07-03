import {
  clearApplications,
  seedApplications,
} from "../entities/application/fixtures/index.js";

afterEach(async () => {
  await clearApplications();
  await seedApplications();
});
