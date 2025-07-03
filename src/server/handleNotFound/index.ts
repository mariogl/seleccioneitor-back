import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError/NotFoundError.js";

const handleNotFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError("Endpoint not found");

  next(error);
};

export default handleNotFound;
