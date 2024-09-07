import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

import routes from "./routes";
import { cors } from "hono/cors";

export const app = new Hono();

app.use(logger());
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
    console.warn("Caught Error", err.message);
    console.debug(err.cause, err.stack);
    return err.getResponse();
  } else {
    console.error(err);
    return c.text("Internal Server Error", 500);
  }
});
