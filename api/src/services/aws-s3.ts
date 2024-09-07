import { S3 } from "@aws-sdk/client-s3";

import { config, isLocal } from "@/config";

import { bindLogger, type Container } from ".";

const s3 = new S3({
  endpoint: isLocal ? "http://localhost:4566" : undefined,
  forcePathStyle: isLocal,
  credentials: isLocal
    ? {
        accessKeyId: "key",
        secretAccessKey: "secret",
      }
    : undefined,
  region: config.aws.region,
});

export const bindS3 = (container: Container): S3 => {
  if (container.bind(container.keys.S3, s3)) {
    const logger = bindLogger(container);
    logger.debug("Binding S3 client to container", { isLocal });
  }
  return container.get<S3>(container.keys.S3);
};
