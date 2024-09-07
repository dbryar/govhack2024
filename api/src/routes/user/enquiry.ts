import { Hono } from "hono";

// POST /users/:session/enquiries - Creates a new enquiry from the current conversation using the current legal framework (if any), the identified responsible party, and the identified contact information.
// GET /users/:session/enquiries/:enquiry - Gets the current model response that will form the basis of the user enquiry to the government service.
// PUT /users/:session/enquiries/:enquiry - Updates the current model response with user edits.
export const enquiry = new Hono();

enquiry.post("/", (c) => c.text(`POST /users/${c.req.param("session")}/enquiries`));
enquiry.get("/:enquiry", (c) => c.text(`GET /users/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}`));
enquiry.put("/:enquiry", (c) => c.text(`PUT /users/${c.req.param("session")}/enquiries/${c.req.param("enquiry")}`));
