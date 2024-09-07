import { Hono } from "hono";

import { response } from "./response";

// POST /agents/:session/enquiries - Create a new enquiry submission from the document received (by the government service)
// GET /agents/:session/enquiries/:enquiry - Get the state of the enquiry
export const enquiry = new Hono();
enquiry.post("/", (c) => c.text(`POST /agents/${c.req.param("session")}/enquiries`));
enquiry.get("/:enquiry", (c) => c.text(`GET /agents/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}`));

enquiry.route("/:enquiry/responses", response);
