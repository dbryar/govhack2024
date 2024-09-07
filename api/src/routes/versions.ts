import { Hono } from "hono"
import { user } from "./user"
import { agent } from "./agent"

export const v1 = new Hono()

v1.get("/", (c) => c.text("API Version 1")) // GET /api/v1/
v1.route("/users", user) // /api/v1/users
v1.route("/agents", agent) // /api/v1/agents
