import { Hono } from "hono";

// GET /users/:session/lookup/legal - Attempt to locate any applicable legislation that may be relevant to the current conversation.
// GET /users/:session/lookup/party - Attempt to locate the responsible party and the appropriate level of government with respect to the current conversation,
// GET /users/:session/lookup/contact - Attempt to locate contact information for the identified responsible party.
export const lookup = new Hono();

lookup.get("/legal", (c) => c.text(`GET /users/${c.req.param("session")}/lookup/legal`));
lookup.get("/party", (c) => c.text(`GET /users/${c.req.param("session")}/lookup/party`));
lookup.get("/contact", (c) => c.text(`GET /users/${c.req.param("session")}/lookup/contact`));
