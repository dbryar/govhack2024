import { Hono } from "hono";

import { getAsset, getClient } from "@/modules/client";

export const client = new Hono();

client.get("/", getClient);
client.get("/icons/:asset", getAsset);
client.get("/image/:asset", getAsset);

export const assets = new Hono();

assets.get("/:asset", getAsset);
