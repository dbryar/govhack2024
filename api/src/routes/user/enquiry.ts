import { Hono } from "hono";

export const enquiry = new Hono();
// Create a new enquiry base on the current conversation using the current legal framework (if any), the identified responsible party, and the identified contact information.
enquiry.post("/", (c) => c.text("POST /user/enquiries"));
// Get the current model response that will form the basis of the user enquiry to the government service
enquiry.get("/:enquiry", (c) => c.text(`GET /user/enquiries/${c.req.param("enquiry")}`));
// Update the current model response with user edits
enquiry.put("/:enquiry", (c) => c.text(`PUT /user/enquiries/${c.req.param("enquiry")}`));
