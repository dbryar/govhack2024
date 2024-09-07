import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity } from "electrodb";

import { config } from "@/config";

import { bindDynamo, bindLogger, type Container } from ".";

const table = config.aws.dynamo.session_table;

const createSessionEntity = (client: DynamoDBClient) =>
  new Entity(
    {
      model: {
        entity: "Session",
        service: "API",
        version: "1",
      },
      attributes: {
        session_id: { type: "string", required: true },
        session_token: { type: "string", required: true },
        session_expiry: { type: "number", required: true },
        session_timeout: { type: "number", required: true },
        user_id: { type: "string", required: true },
        user_data: { type: "string", required: false },
        user_messages: { type: "string", required: false },
        request_id: { type: "string", required: false },
        response_id: { type: "string", required: false },
        status: {
          type: ["initial", "active", "complete", "expired", "revoked"] as const,
          default: "initial",
        },
        metadata: { type: "string" },
        created_at: { type: "string", default: new Date().toISOString(), onUpdate: false },
        updated_at: { type: "string", default: new Date().toISOString(), onUpdate: true },
        deleted_at: { type: "string" },
      },
      indexes: {
        primary: {
          pk: { field: "pk", composite: ["session_id"] },
          sk: { field: "sk", composite: [] },
        },
        requestResponseIndex: {
          index: "gsi1",
          pk: { field: "gsi1pk", composite: ["request_id"] },
          sk: { field: "gsi1sk", composite: ["response_id"] },
        },
      },
    },
    { client, table }
  );

type SessionEntity = ReturnType<typeof createSessionEntity>;

export const bindSession = (container: Container): SessionEntity => {
  const client = bindDynamo(container);
  const sessionEntity = createSessionEntity(client);
  if (container.bind(container.keys.Session, sessionEntity)) {
    const logger = bindLogger(container);
    logger.debug("Binding Session entity to container", { table });
  }
  return container.get<SessionEntity>(container.keys.Session);
};
