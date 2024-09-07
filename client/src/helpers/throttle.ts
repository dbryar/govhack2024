import { logger } from "@/services";
import SessionStore from "@/services/session-store";

export const throttle = async <A = unknown, T = void>(
  fn: (args: A) => Awaited<T>,
  args: A,
  period: number
): Promise<Awaited<T> | undefined> => {
  const now = Date.now();
  if (SessionStore.has(fn.name)) {
    const expiry = SessionStore.get<number>(fn.name, 0);
    if (now > expiry) {
      SessionStore.remove(fn.name);
      return fn(args);
    } else {
      logger.debug("Throttled call to", fn.name);
      return;
    }
  } else {
    SessionStore.set(fn.name, now + period);
    return fn(args);
  }
};
