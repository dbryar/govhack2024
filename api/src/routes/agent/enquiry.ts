import { Hono } from "hono";

import { response } from "./response";

export const enquiry = new Hono();
// Create a new enquiry submission from the document received (by the government service)
enquiry.post("/", (c) => c.text("POST /agent/enquiries"));
// Get the state of the enquiry
enquiry.get("/:enquiry", (c) => c.text(`GET /agent/enquiries/${c.req.param("enquiry")}`));

enquiry.route("/:enquiry/responses", response);
