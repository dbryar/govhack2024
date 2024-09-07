import { Hono } from "hono"

import routes from "./routes"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"

export const app = new Hono()

app.use(logger())

app.route("/", routes)

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    console.warn("Caught Error", err.message)
    console.debug(err.cause, err.stack)
    return err.getResponse()
  } else {
    console.error(err)
    return c.text("Internal Server Error", 500)
  }
})
