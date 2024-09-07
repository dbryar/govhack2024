import { app } from "./app";
import { config } from "./config";
import { bindLogger, container } from "./services";

const logger = bindLogger(container);
const { fetch } = app;
const {
  server: { port },
} = config;

logger.info(`Starting API on port ${port}`);
Bun.serve({ port, fetch });
