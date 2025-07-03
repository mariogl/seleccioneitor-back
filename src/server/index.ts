import express from "express";
import checkHealth from "./healthCheck/index.js";
import handleNotFound from "./handleNotFound/index.js";
import handleErrors from "./handleErrors/index.js";

const app = express();

app.get("/", checkHealth);

app.use(handleNotFound);
app.use(handleErrors);

export default app;
