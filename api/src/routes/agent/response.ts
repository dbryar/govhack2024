import { Hono } from "hono";

// GET /agents/:session/enquiries/:enquiry/responses - Generate a new response to the enquiry, and return the ID
// GET /agents/:session/enquiries/:enquiry/responses/:response - Get the current model response that will be sent to the user.
// PUT /agents/:session/enquiries/:enquiry/responses/:response - Updates the current model response with agent edits. Feedback is received based on the response adherence to the Style Guide.
// POST /agents/:session/enquiries/:enquiry/responses/:response - Finalises the response and marks the response as complete.
export const response = new Hono();

response.get("/", (c) => c.text(`GET /agents/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}/responses`));
response.get("/:response", (c) => c.text(`GET /agents/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`));
response.put("/:response", (c) => c.text(`PUT /agents/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`));
response.post("/:response", (c) => c.text(`POST /agents/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}/responses/${c.req.param("response")}`));
