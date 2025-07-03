import ServerError from "../ServerError/ServerError.js";

class NotFoundError extends ServerError {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
