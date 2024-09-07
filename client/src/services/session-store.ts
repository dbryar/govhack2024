// import container, { bindLogger } from "@/boot/container";
import { Logger, logger } from "@/services/logger";

import pkg from "../../package.json";

type StorageType = number | string | boolean | undefined | null;
type StorageItem = StorageType | StorageType[] | object | Date;

export interface ISessionStore {
  has(key: string, usePrefix?: boolean): boolean;
  get<T = unknown>(key: string, initialValue?: StorageItem, usePrefix?: boolean): T;
  set(key: string, value: StorageItem, usePrefix?: boolean): void;
  remove(key: string, usePrefix?: boolean): boolean;
  clearAll(): void;
  clearLocal(): void;
}

const r = /[^\w.]/g;
const prefix = (key: string, usePrefix: boolean): string =>
  usePrefix ? `${pkg.name ?? "unknown"}.${key.replace(r, "")}` : key.replace(r, "");

/**
 * SessionStore is a simple wrapper around the browser's sessionStorage object
 * to store items in more organised manner while preserving value types.
 * Supports numbers, strings, booleans, objects and date types.
 * @example
 *  import SessionStore from "@/services/session-store";
 *  SessionStore.set("key1", "value") // { key1: "string|value" }
 *  SessionStore.set("key2", 42) // { key2: "number|42" }
 *  const value1: unknown = SessionStore.get("key1") // "value";
 *  const value2: number = SessionStore.get<number>("key2") // 42;
 */
export class SessionStore implements ISessionStore {
  private static _instance: SessionStore;

  static init(logger: Logger) {
    if (!SessionStore._instance) SessionStore._instance = new SessionStore(logger);
    return SessionStore._instance;
  }
  private constructor(private logger: Logger) {}

  has = (key: string, usePrefix = true): boolean => {
    const keys = Object.keys(sessionStorage);
    return keys.includes(prefix(key, usePrefix));
  };

  get = <T = unknown>(key: string, initialValue?: StorageItem, usePrefix = true): T => {
    this.logger.debug("session: get() request", { key, usePrefix, initialValue });
    if (this.has(key, usePrefix)) {
      const [sType, sVal] = sessionStorage.getItem(prefix(key, usePrefix))?.split(/\|(.*)/s) ?? [
        "undefined",
        "",
      ];
      this.logger.debug("session: get() result", {
        sKey: prefix(key, usePrefix),
        sType,
        sVal,
      });
      if (sType == "number") return Number(sVal) as T;
      if (sType == "boolean") return sVal === "true" ? (true as T) : (false as T);
      if (sType == "string") return sVal as T;
      if (sType == "object") return JSON.parse(sVal) as T;
      if (sType == "date") {
        const obj = new Date();
        obj.setTime(Number(sVal));
        return obj as T;
      }
      return undefined as T;
    } else {
      return initialValue as T;
    }
  };

  set = (key: string, value: StorageItem, usePrefix = true): void => {
    this.logger.debug("session: set() request", { key, usePrefix, value });
    const sType = value instanceof Date ? "date" : typeof value;
    const sVal =
      value instanceof Date
        ? value.getTime()
        : sType == "object"
          ? JSON.stringify(value)
          : value?.toString();
    this.logger.debug("session: set() result", {
      sKey: prefix(key, usePrefix),
      sType,
      sVal,
    });
    sessionStorage.setItem(prefix(key, usePrefix), `${sType}|${sVal}`);
  };

  remove = (key: string, usePrefix = true): boolean => {
    this.logger.debug("session: remove() request", { key, usePrefix });
    if (this.has(key, usePrefix)) {
      this.logger.debug("session: remove() success", true);
      sessionStorage.removeItem(prefix(key, usePrefix));
      return true;
    }
    this.logger.debug("session: remove() failed", false);
    return false;
  };

  clearAll = (): void => {
    this.logger.debug("session: clearAll()");
    sessionStorage.clear();
  };

  clearLocal = (): void => {
    this.logger.debug("session: clearLocal() searching", sessionStorage.length, "item(s)");
    if (!sessionStorage.length) return;
    let i = 0;
    Object.entries(sessionStorage).forEach(([sKey, value], index) => {
      const [sType, sVal] = value.split(/\|(.*)/s);
      if (
        sType &&
        sVal !== undefined &&
        value.match(/^(number)|(boolean)|(string)|(object)|(date)|(undefined)/)
      ) {
        this.logger.debug(`sessionStore: clearLocal() item ${index}`, {
          sKey,
          sType,
          sVal,
        });
        sessionStorage.removeItem(sKey);
        i++;
      }
    });
    this.logger.debug("session: clearLocal() removed", i, "item(s)");
  };
}

export default SessionStore.init(logger);
