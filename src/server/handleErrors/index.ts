import { NextFunction, Request, Response } from "express";
import ServerError from "../../errors/ServerError/ServerError.js";

const isServerError = (error: Error): error is ServerError => {
  return error instanceof ServerError;
};

const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  const statusCode = isServerError(error) ? error.statusCode : 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default handleErrors;
