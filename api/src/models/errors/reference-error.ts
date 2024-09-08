import { HttpError, type HttpErrorParams } from ".";

export class ReferenceError extends HttpError {
  constructor(options?: HttpErrorParams) {
    super({ ...options, statusCode: 400 });
  }
}
