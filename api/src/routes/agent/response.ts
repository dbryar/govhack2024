import { Hono } from "hono";

export const response = new Hono();

// Generate a new response to the enquiry, and return the ID
response.get("/", (c) => c.text(`GET /agent/enquiries/${c.req.param("enquiry")}/responses`));
// Get the current model response that will be sent to the user.
response.get("/:response", (c) =>
  c.text(`GET /agent/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`)
);
// Updates the current model response with agent edits. Feedback is received based on the response adherence to the Style Guide.
response.put("/:response", (c) =>
  c.text(`PUT /agent/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`)
);
// Finalises the response and marks the response as complete.
response.post("/:response", (c) =>
  c.text(`POST /agent/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`)
);
