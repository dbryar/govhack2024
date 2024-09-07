import { beforeEach, describe, expect, it } from "vitest";

import SessionStore from "../session-store";

describe("session-store", () => {
  describe("has", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should be able to index the session storage keys", () => {
      const key = "testKey";
      const value = "testValue";

      sessionStorage.setItem(key, value);
      const index = Object.keys(sessionStorage);

      expect(index).toContain(key);
      expect(SessionStore.has(key, false)).toBe(true);
    });

    it("should return false if the key does not exist", () => {
      const key = "testKey";

      expect(SessionStore.has(key, false)).toBe(false);
    });

    it("should use a key prefix by default to store the value", () => {
      const key = "testKey";
      const value = "testValue";

      SessionStore.set(key, value);
      const result = Object.keys(sessionStorage)[0];

      expect(SessionStore.has(key)).toBe(true);
      expect(result).toMatch(new RegExp(key));
      expect(result).not.toEqual(key);
    });
  });

  describe("get", () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it("should return the initial value if the stored value does not exist", () => {
      const key = "testKey";
      const initialValue = "initialValue";

      const result = SessionStore.get<string>(key, initialValue, false);

      expect(result).toEqual(initialValue);
    });

    it("should parse and return a number value", () => {
      const key = "testKey";
      const value = 42;
      sessionStorage.setItem(key, `number|${value}`);

      const result = SessionStore.get<number>(key, undefined, false);

      expect(result).toEqual(value);
    });

    it("should parse and return a boolean value", () => {
      const key = "testKey";
      const value = "true";
      sessionStorage.setItem(key, `boolean|${value}`);

      const result = SessionStore.get<boolean>(key, undefined, false);

      expect(result).toEqual(true);
    });

    it("should parse and return a string value", () => {
      const key = "testKey";
      const value = "testString";
      sessionStorage.setItem(key, `string|${value}`);

      const result = SessionStore.get<string>(key, undefined, false);

      expect(result).toEqual(value);
    });

    it("should parse and return an object value", () => {
      const key = "testKey";
      const value = { foo: "bar" };
      sessionStorage.setItem(key, `object|${JSON.stringify(value)}`);

      const result = SessionStore.get<object>(key, undefined, false);

      expect(result).toEqual(value);
    });

    it("should parse and return a date value", () => {
      const key = "testKey";
      const value = new Date("2021-02-03T04:05:06.789Z").getTime();
      sessionStorage.setItem(key, `date|${value}`);

      const result = SessionStore.get<Date>(key, undefined, false);

      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toEqual(value);
    });

    it("should return undefined if the stored value is invalid", () => {
      const key = "testKey";
      const value = "";
      sessionStorage.setItem(key, `${value}`);

      const result = SessionStore.get<string>(key, undefined, false);

      expect(result).toBeUndefined();
    });
  });
});
