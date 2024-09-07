import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { config, isLocal } from "@/config";

import { bindLogger, type Container } from ".";

const dynamo = new DynamoDBClient({
  endpoint: isLocal ? "http://localhost:4566" : undefined,
  credentials: isLocal
    ? {
        accessKeyId: "key",
        secretAccessKey: "secret",
      }
    : undefined,
  region: config.aws.region,
});

export const bindDynamo = (container: Container): DynamoDBClient => {
  if (container.bind(container.keys.Dynamo, dynamo)) {
    const logger = bindLogger(container);
    logger.debug("Binding DynamoDB client to container", { isLocal });
  }
  return container.get<DynamoDBClient>(container.keys.Dynamo);
};
