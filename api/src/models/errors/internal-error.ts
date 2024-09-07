import { HttpError, type HttpErrorParams } from ".";

export class InternalError extends HttpError {
  constructor(options?: HttpErrorParams) {
    super({ ...options, statusCode: 500 });
  }
}
