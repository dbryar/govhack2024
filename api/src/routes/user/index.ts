import { Hono } from "hono";

import { enquiry } from "./enquiry";
import { lookup } from "./lookup";

export const user = new Hono();

user.route("/lookup/*", lookup);
user.route("/enquiry/*", enquiry);
user.route("/enquiry", enquiry);

user.get("/", (c) => c.text("GET /user")); // Get session messages
user.put("/", (c) => c.text("PUT /user")); // Add session message
user.post("/", (c) => c.text("POST /user")); // Create session
user.delete("/", (c) => c.text("DELETE /user")); // Delete session messages
