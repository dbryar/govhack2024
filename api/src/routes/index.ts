import { Hono } from "hono";

import { v1 } from "./versions";
import { sessionHandler } from "@/middleware/session-handler";

const routes = new Hono();
routes.use("/api/*", sessionHandler);
routes.route("/api/v1", v1);

export default routes;
