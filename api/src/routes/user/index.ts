import { Hono } from "hono";

import { enquiry } from "./enquiry";
import { lookup } from "./lookup";

// POST /users/ - Creates a new user session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
// GET /users/:session - Gets the current conversation, including all history.
// POST /users/:session - Sends the next user response to the LLM agent for the current conversation. Streams a response to the client.
// DELETE /users/:session - Deletes the current user session.
export const user = new Hono();

user.post("/", (c) => c.text("POST /users/"));
user.get("/:session", (c) => c.text(`GET /users/${c.req.param("session")}`));
user.post("/:session", (c) => c.text(`POST /users/${c.req.param("session")}`));
user.delete("/:session", (c) => c.text(`DELETE /users/${c.req.param("session")}`));

user.route("/:session/lookup", lookup);
user.route("/:session/enquiries", enquiry);
