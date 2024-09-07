import { Hono } from "hono"
import { analytics } from "./analytics"
import { enquiry } from "./enquiry"

// POST /agents - Creates a new agent session. Returns a session ID that is also stored as a cookie. The cookie must be sent with all subsequent requests to the API.
// GET /agents/:session - Gets the current agent profile
// PUT /agents/:session - Updates the current agent profile
// DELETE /agents/:session - Deletes the current agent session.
export const agent = new Hono()

agent.post("/", (c) => c.text("POST /agents"))
agent.get("/:session", (c) => c.text(`GET /agents/${c.req.param("session")}`))
agent.put("/:session", (c) => c.text(`PUT /agents/${c.req.param("session")}`))
agent.delete("/:session", (c) => c.text(`DELETE /agents/${c.req.param("session")}`))

agent.route("/:session/analytics", analytics)
agent.route("/:session/enquiries", enquiry)
