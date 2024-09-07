import { QNotifyCreateOptions } from "quasar";

const MIN_TIMEOUT = 1000;
const MAX_TIMEOUT = 5000;
const DIVISOR = 100;

const scaleFactor = (MAX_TIMEOUT - MIN_TIMEOUT) / Math.pow(DIVISOR, 2);

function calculateNotificationTimeout(message: string): number {
  const timeout = MIN_TIMEOUT + scaleFactor * message.length * message.length;
  return Math.min(MAX_TIMEOUT, Math.max(MIN_TIMEOUT, timeout));
}

export class NotifyError extends Error {
  public timeout: number;

  private defaults = {
    position: "center",
    type: "warning",
  };

  constructor(opts: string | QNotifyCreateOptions) {
    super(typeof opts == "string" ? opts : opts.message);
    this.message = super.message;
    this.timeout = calculateNotificationTimeout(this.message);

    Object.assign(this, this.defaults);
    if (typeof opts != "string") {
      Object.assign(this, opts);
    }
  }
}
