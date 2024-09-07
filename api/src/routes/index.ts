import { Hono } from "hono"
import { v1 } from "./versions"

const routes = new Hono()
routes.route("/api/v1", v1)

export default routes
