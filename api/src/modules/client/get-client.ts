import type { Context } from "hono";

import { config } from "@/config";
import { InternalError } from "@/models";
import { bindLogger, bindS3, container } from "@/services";
import { generateAwsErrorDetails } from "@/utils";

export async function getClient(c: Context) {
  const logger = bindLogger(container);
  const s3 = bindS3(container);

  const clientKey = config.client.file + "_v" + config.client.version;

  // Get client bundle from S3
  let clientBundle = "";
  let mimeType = "text/html";
  try {
    logger.debug("Fetching client from S3", { clientKey });
    const result = await s3.getObject({ Bucket: config.aws.s3.bucket, Key: clientKey });
    clientBundle = (await result.Body?.transformToString()) || clientBundle;
    mimeType = result.ContentType || mimeType;
  } catch (err) {
    const error = generateAwsErrorDetails(err);
    throw new InternalError({
      message: "Failed to fetch client from S3",
      cause: { clientKey, error },
    });
  }

  c.header("Content-Type", mimeType);
  return c.body(clientBundle);
}
