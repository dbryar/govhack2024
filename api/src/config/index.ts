export const config = {
  env: process.env.ENVIRONMENT || "local",
  server: {
    host: process.env.SERVER_HOST || "http://localhost",
    port: Number(process.env.SERVER_PORT) || 3030,
  },
  aws: {
    account: process.env.AWS_ACCOUNT || "",
    region: process.env.AWS_REGION || "ap-southeast-2",
    s3: {
      bucket: process.env.AWS_S3_BUCKET || "local-bucket",
    },
    dynamo: {
      response_table: process.env.AWS_DYNAMO_RESPONSE_TABLE || "local-response-table",
      session_table: process.env.AWS_DYNAMO_SESSION_TABLE || "local-session-table",
    },
  },
  openrouter: {
    url: process.env.OPENROUTER_API_URL || "https://openrouter.ai/api/v1",
    key: process.env.OPENROUTER_API_KEY || "unknown-key-value",
  },
  session: {
    timeout: Number(process.env.AUTH_SESSION_TIMEOUT) || 600, // 10 minutes
    max_age: Number(process.env.AUTH_SESSION_MAX_AGE) || 86400 * 30, // 30 days
  },
};

export const isLocal = config.env === "local";
export const isDevelop = config.env === "develop" || isLocal;
export const isProduction = config.env === "production";

export * from "./container";
