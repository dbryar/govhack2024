import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger as requestLogger } from "hono/logger";

import routes from "./routes";
import { bindLogger, container } from "./services";

export const app = new Hono();
const logger = bindLogger(container);

app.use(requestLogger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["DELETE", "GET", "POST", "PUT", "OPTIONS"],
    maxAge: 600,
  })
);
app.route("/", routes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    logger.warn("Caught Error", err.message);
    if (err.cause) logger.info(err.cause);
    logger.debug(err.stack);
    return err.getResponse();
  } else {
    logger.error(err);
    return c.text("Internal Server Error", 500);
  }
});
