import { HTTPException } from "hono/http-exception"
import type { StatusCode } from "hono/utils/http-status"

export type HttpErrorParams = {
  statusCode?: StatusCode
  res?: Response
  message?: string
  cause?: unknown
}

export class HttpError extends HTTPException {
  constructor({ statusCode, ...options }: HttpErrorParams) {
    super(statusCode, options)
  }
}
