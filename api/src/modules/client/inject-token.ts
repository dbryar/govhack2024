import { type GetObjectCommandOutput } from "@aws-sdk/client-s3";

import { InternalError } from "@/models";

export async function injectSessionToken(
  s3result: GetObjectCommandOutput,
  token: string
): Promise<string> {
  if (!token) {
    throw new InternalError({ message: "Session token is not defined" });
  }

  const payload = await s3result.Body?.transformToString();

  if (!payload) {
    throw new InternalError({ message: "Failed to transform S3 object to string" });
  }

  return payload.replace(/\{\{SESSION_TOKEN\}\}/g, token);
}
