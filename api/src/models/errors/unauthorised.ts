import { HttpError, type HttpErrorParams } from ".";

export class UnauthorizedError extends HttpError {
  constructor(options?: HttpErrorParams) {
    super({ ...options, statusCode: 401 });
  }
}
