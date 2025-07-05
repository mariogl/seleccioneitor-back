import ServerError from "../ServerError/ServerError.js";

class InternalServerError extends ServerError {
  constructor(message: string = "Internal server error") {
    super(500, message);
  }
}

export default InternalServerError;
