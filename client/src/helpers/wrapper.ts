import { Notify } from "quasar";

import { NotifyError } from "@/models";
import { logger } from "@/services";

export const feedbackWrapper = async <A = undefined, T = void>(
  fn: (args: A) => Promise<T> | T,
  args: A
) => {
  try {
    return await fn(args);
  } catch (error) {
    if (error instanceof NotifyError) Notify.create(error);
    else {
      logger.error(error);
      throw error;
    }
  }
};
