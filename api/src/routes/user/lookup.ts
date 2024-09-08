import { Hono } from "hono";

export const lookup = new Hono();

// Attempt to locate any applicable legislation that may be relevant to the current conversation.
lookup.get("/legal", (c) => c.text("GET /user/lookup/legal"));
// Attempt to locate the responsible party and the appropriate level of government with respect to the current conversation.
lookup.get("/party", (c) => c.text("GET /user/lookup/party"));
// Attempt to locate contact information for the identified responsible party.
lookup.get("/contact", (c) => c.text("GET /user/lookup/contact"));
