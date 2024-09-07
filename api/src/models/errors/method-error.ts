import { HttpError, type HttpErrorParams } from ".";

export class MethodError extends HttpError {
  constructor(options?: HttpErrorParams) {
    super({ ...options, statusCode: 405 });
  }
}
