import { randomBytes } from "node:crypto";

import type { Context, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

import { config, isProduction } from "@/config";
import { HttpError, InternalError, MethodError, NotFoundError, UnauthorizedError } from "@/models";
import { bindLogger, bindSession, container } from "@/services";

// Generate a strong session ID
const generateSessionId = () => {
  return randomBytes(16).toString("hex");
};

const generateSessionToken = () => {
  return randomBytes(24).toString("base64");
};

export async function sessionHandler(c: Context, next: Next) {
  const logger = bindLogger(container);
  const sessionDB = bindSession(container);
  const sid = getCookie(c, "sid"); // session ID
  const now = Math.round(Date.now() / 1000);
  const { session } = c.req.param(); // session token
  const options: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: config.session.max_age,
  };

  try {
    if (sid) {
      // Validate session ID from DynamoDB
      const { data } = (await sessionDB
        .find({ session_id: sid })
        // .where() // TODO: limit to valid sessions only, e.g. initial, in progress and not timed out, or completed
        .go()) ?? { data: [] };

      if (!data.length) {
        throw new NotFoundError({ message: "Session not found" });
      }

      if (session && data[0].session_token && session !== data[0].session_token) {
        deleteCookie(c, "sid");
        throw new UnauthorizedError({ message: "Invalid session" });
      }

      logger.debug("Restored session", data[0].session_id);

      c.set("session", data[0]);
    } else {
      if (c.req.path !== "/") {
        throw new MethodError({
          message: `${c.req.method} ${c.req.path} not allowed for unauthenticated requests.`,
        });
      }

      const session_id = generateSessionId();
      const session_token = generateSessionToken();
      const session_locale = c.req.header("Accept-Language")?.split(",")[0] || "en-AU";
      setCookie(c, "sid", session_id, options);

      // Generate a new session ID and store in DynamoDB
      const { data } = await sessionDB
        .create({
          session_id,
          session_expiry: now + config.session.max_age,
          session_timeout: now + config.session.timeout,
          session_token,
          session_locale,
        })
        .go();

      logger.info("New session initialised", data.session_id);
      logger.debug("Session data", data);
      c.set("session", data);
    }

    const thisSession = c.get("session");
    const sessionHasExpired = thisSession.session_expiry < now;
    const sessionHasTimedOut = thisSession.session_timeout < now;

    if (sessionHasExpired || sessionHasTimedOut) {
      logger.warn(
        `Session ${sessionHasExpired ? "expired" : "timed out"}. Restarting.`,
        thisSession.session_id
      );
      const { session_id } = thisSession;
      const session_token = generateSessionToken();
      setCookie(c, "sid", session_id, options);

      // Reset the session
      const { data: sessionData } = await sessionDB
        .update({ session_id })
        .set({
          session_expiry: now + config.session.max_age,
          session_timeout: now + config.session.timeout,
          session_token,
          user_messages: "",
          user_id: "",
          user_data: "",
          request_id: "",
          response_id: "",
          status: "initial",
        })
        .go();

      c.set("session", sessionData);
    }
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      logger.error("Failed to create session", error);
      throw new InternalError({
        message: "Failed to create session",
      });
    }
  }
  await next();
}
