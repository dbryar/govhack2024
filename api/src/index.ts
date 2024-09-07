import { app } from "./app";

const { fetch } = app;

Bun.serve({
  port: process.env.PORT || 3030,
  fetch,
});
