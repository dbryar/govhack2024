import { Hono } from "hono";

import { analytics } from "./analytics";
import { enquiry } from "./enquiry";

export const agent = new Hono();

// Gets the current agent profile
agent.get("/", (c) => c.text("GET /agent"));
// Updates the current agent profile
agent.put("/", (c) => c.text("PUT /agent"));
// Creates a new agent session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
agent.post("/", (c) => c.text("POST /agent"));
// Deletes the current agent session.
agent.delete("/", (c) => c.text("DELETE /agent"));

agent.route("/analytics/*", analytics);
agent.route("/enquiries/*", enquiry);
