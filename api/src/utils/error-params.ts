import type { Context } from "hono";

import { InternalError, ReferenceError } from "@/models";

export const generateParamErrorDetails = async (
  required: string[],
  ctx: Context,
  { query = false, body = false, params = false }
): Promise<ReferenceError | void> => {
  if (!query && !body && !params) {
    throw new InternalError({ message: "At least one of query, body, or params must be true." });
  }

  const cause: string[] = [];
  const json = await ctx.req.json();

  required.forEach((param) => {
    if (
      (query && !ctx.req.query(param)) ||
      (body && !json[param]) ||
      (params && !ctx.req.param(param))
    ) {
      cause.push(`${param} is missing and required`);
    }
  });

  return cause.length
    ? new ReferenceError({
      message: "Missing required parameters",
      cause,
    })
    : undefined;
};
