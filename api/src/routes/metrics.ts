import { Hono } from "hono";

import { getFingerprintLoader } from "@/modules/fingerprint";

// Route /metrics
export const metrics = new Hono();

metrics.get("/:version/:apiKey/:loader", getFingerprintLoader);
