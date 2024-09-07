import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { InternalError } from "@/models";
import { bindAxios, bindLogger, container } from "@/services";
import { generateParamErrorDetails } from "@/utils";

export async function getFingerprintLoader(c: Context) {
  const logger = bindLogger(container);
  const { version, apiKey, loader } = c.req.param();

  if (!version || !apiKey || !loader) {
    throw await generateParamErrorDetails(["version", "apiKey", "loader"], c, {
      params: true,
    });
  }

  logger.info("Fingerprint loader request", { apiKey, loader });

  const axios = bindAxios(container);
  const response = await axios
    .get(`https://fpnpmcdn.net/${version}/${apiKey}/${loader}`)
    .catch((error) => {
      throw new InternalError({ message: "Failed to fetch fingerprint loader", cause: error });
    });
  c.header("Content-Type", response.headers["content-type"]);
  c.header("Content-Length", response.headers["content-length"]);
  c.status(response.status as StatusCode);
  return c.body(response.data);
}
