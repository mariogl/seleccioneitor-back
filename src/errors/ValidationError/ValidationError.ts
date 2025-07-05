import ServerError from "../ServerError/ServerError.js";

class ValidationError extends ServerError {
  constructor(message: string = "Validation failed", public field?: string) {
    super(400, message);
  }
}

export default ValidationError;
