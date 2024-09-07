import { Hono } from "hono";

import { sessionHandler } from "@/middleware/session-handler";

import { assets, client } from "./client";
import { metrics } from "./metrics";
import { v1 } from "./versions";

const routes = new Hono();
routes.use("/api/*", sessionHandler);
routes.route("/api/v1", v1);

routes.route("/assets", assets);
routes.route("/metrics", metrics);
routes.route("/", client);

export default routes;
