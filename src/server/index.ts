import express from "express";
import cors from "cors";
import checkHealth from "./healthCheck/index.js";
import handleNotFound from "./handleNotFound/index.js";
import handleErrors from "./handleErrors/index.js";
import { applicationRouter } from "../entities/application/routes/application.routes.js";
import { setupSwagger } from "./swagger/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Setup Swagger documentation
setupSwagger(app);

app.get("/", checkHealth);

app.use("/applications", applicationRouter);

app.use(handleNotFound);
app.use(handleErrors);

export default app;
