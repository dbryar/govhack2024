import { HttpError, type HttpErrorParams } from ".";

export class NotFoundError extends HttpError {
  constructor(options?: HttpErrorParams) {
    super({ ...options, statusCode: 404 });
  }
}
