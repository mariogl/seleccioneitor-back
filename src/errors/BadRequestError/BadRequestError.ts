import ServerError from "../ServerError/ServerError.js";

class BadRequestError extends ServerError {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}

export default BadRequestError;
