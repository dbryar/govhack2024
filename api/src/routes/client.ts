import { Hono } from "hono";

import { sessionHandler } from "@/middleware/session-handler";
import { getAsset, getClient } from "@/modules/client";

export const client = new Hono();

client.get("/", getClient);
client.get("/icons/:asset", getAsset);
client.get("/image/:asset", getAsset);

export const assets = new Hono();

// Conditionally apply the session handler on the client side axios
assets.use("/:asset", async (c, next) => {
  const assetKey = c.req.param("asset");
  if (/axios.*js/.test(assetKey)) {
    await sessionHandler(c, next);
  } else {
    await next();
  }
});
assets.get("/:asset", getAsset);
