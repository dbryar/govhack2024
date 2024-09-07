import { isAxiosError } from "axios";

import { logger } from "@/services";

export const logAxiosError = (err: unknown): void => {
  if (isAxiosError(err)) {
    const url =
      err.config && err.config.url
        ? err.config.url.startsWith("http")
          ? err.config.url
          : `${err.config.baseURL ?? ""}${err.config.url}`
        : "Invalid or missing URL";
    logger.error(
      err.config
        ? `axios::error ${err.config.method?.toUpperCase() ?? "GET"} ${url}`
        : "Missing Axios config",
      err.message
    );
    logger.debug({
      status: err.response?.status,
      message: err.response?.statusText,
      code: err.code,
      data: err.response?.data,
    });
  } else {
    logger.error(err);
  }
};
