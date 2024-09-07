import { Container } from "@/utils/container";

// placeholder for future logging service
const logger = {
  ...console,
  trace: console.debug,
};

export type Logger = typeof logger;

export const bindLogger = (container: Container): Logger => {
  if (container.bind(container.keys.Logger, logger)) {
    logger.debug("Binding Logger to container");
  }
  return container.get<Logger>(container.keys.Logger);
};
