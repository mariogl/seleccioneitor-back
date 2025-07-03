import { Router } from "express";
import { applicationController } from "../controller/application.controller.js";

const applicationRouter = Router();

applicationRouter.get(
  "/",
  applicationController.getAllApplications.bind(applicationController)
);

export { applicationRouter };
