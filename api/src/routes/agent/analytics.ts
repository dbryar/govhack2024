import { Hono } from "hono";

// POST /agents/:session/analytics - Create a new analytics submission from a document or content page to be published (by the government service), and return the ID.
// GET /agents/:session/analytics/:submission - Get the state of the analytics submission.
// POST /agents/:session/analytics/:submission - Elicit feedback from the model on the adherence to the Style Guide.
export const analytics = new Hono();
analytics.post("/", (c) => c.text(`POST /agents/${c.req.param("session")}/analytics`));
analytics.get("/:submission", (c) => c.text(`GET /agents/${c.req.param("session")}/analytics/${c.req.param("submission")}`));
analytics.post("/:submission", (c) => c.text(`POST /agents/${c.req.param("session")}/analytics/${c.req.param("submission")}`));
