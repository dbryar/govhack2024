import { S3ServiceException } from "@aws-sdk/client-s3";
import { type Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { config } from "@/config";
import { HttpError, InternalError, NotFoundError } from "@/models";
import { bindLogger, bindS3, container } from "@/services";

export async function getAsset(c: Context) {
  const logger = bindLogger(container);
  const s3 = bindS3(container);
  const assetFile = c.req.param("asset");
  const assetKey = `assets/${assetFile}`;

  // Get asset from S3
  try {
    logger.debug("Fetching asset from S3", { assetKey });
    const result = await s3.getObject({ Bucket: config.aws.s3.bucket, Key: assetKey });
    const mimeType = result.ContentType || "application/octet-stream";

    if (!result.Body || result.DeleteMarker) {
      throw new NotFoundError({
        message: `/assets/${assetKey} not found`,
        cause: "empty object",
      });
    }

    const output = result.Body;

    c.status((result.$metadata.httpStatusCode ?? 200) as StatusCode);
    c.header("Content-Type", mimeType);
    c.header("Content-Length", result.ContentLength?.toString() || "0");

    const chunks: Uint8Array[] = [];
    for await (const chunk of output as unknown as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    // concatenate the chunks into a single buffer and send it for text data
    const object = Buffer.concat(chunks);

    logger.debug(c.res.headers);
    return c.body(object.toString());
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof S3ServiceException && error.name === "NoSuchKey") {
      throw new NotFoundError({ message: `/assets/${assetKey} not found`, cause: error });
    }

    throw new InternalError({
      message: "Failed to fetch asset from S3",
      cause: { assetKey, error },
    });
  }
}
