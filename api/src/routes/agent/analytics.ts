import { Hono } from "hono";

export const analytics = new Hono();
// Create a new analytics submission from a document or content page to be published (by the government service), and return the ID.
analytics.post("/", (c) => c.text("POST /agent/analytics"));
// Get the state of the analytics submission.
analytics.get("/:submission", (c) => c.text(`GET /agent/analytics/${c.req.param("submission")}`));
// Elicit feedback from the model on the adherence to the Style Guide.
analytics.post("/:submission", (c) => c.text(`POST /agent/analytics/${c.req.param("submission")}`));
