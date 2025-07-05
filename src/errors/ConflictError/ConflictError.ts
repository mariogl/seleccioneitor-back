import ServerError from "../ServerError/ServerError.js";

class ConflictError extends ServerError {
  constructor(message: string = "Resource conflict") {
    super(409, message);
  }
}

export default ConflictError;
