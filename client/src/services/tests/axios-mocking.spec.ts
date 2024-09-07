import { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { beforeEach, describe, expect, it } from "vitest";

import {
  MockInterceptor,
  mockRequestInterceptor,
  mockResponseErrorInterceptor,
  Mocks,
} from "../mocks";

let mocks: Mocks;

describe("Axios Mocking", () => {
  beforeEach(() => {
    mocks = Mocks.getInstance();
    mocks.clear();
  });
  describe("getters and setters", () => {
    it("should add a mock to the mocks object", () => {
      const method = "get";
      const url = "/test";
      const status = 200;

      mocks.set(method, url, status);

      expect(mocks.get(method, url)).toEqual({ status, data: undefined });
    });

    it("should add a mock with data to the mocks object", () => {
      const method = "post";
      const url = "/test2";
      const status = 201;
      const data = { test: "data" };

      mocks.set<{ test: string }>(method, url, status, data);

      expect(mocks.get(method, url)).toEqual({ status, data });
    });

    it("should add a mock with message to the mocks object", () => {
      const method = "post";
      const url = "/test3";
      const status = 401;
      const message = "Unauthorized";

      mocks.set<string>(method, url, status, message);

      expect(mocks.get(method, url)).toEqual({ status, message });
    });

    it("should return undefined with an invalid url/method", () => {
      const method = "put";
      const url = "/test4";

      expect(mocks.get(method, url)).toBeUndefined();
    });

    it("should clear all the mocks", () => {
      const method = "get";
      const url = "/test";
      const status = 200;

      mocks.set(method, url, status);
      expect(mocks.get(method, url)).toEqual({ status, data: undefined });

      mocks.clear();
      expect(mocks.get(method, url)).toBeUndefined();
    });
  });

  describe("enable/disable mocking", () => {
    it("should set mockEnabled to true when passed true", () => {
      mocks.enable(true);
      expect(mocks.mockEnabled).toBe(true);
    });

    it("should set mockEnabled to false when passed false", () => {
      mocks.enable(false);
      expect(mocks.mockEnabled).toBe(false);
    });
  });

  describe("mockRequestInterceptor", () => {
    beforeEach(() => {
      mocks.enable(false);
    });

    it("should return the config if mockEnabled is false", async () => {
      const config = { url: "/test", method: "get", headers: {} as AxiosHeaders };
      expect(await mockRequestInterceptor(config)).toEqual(config);
    });

    it("should return the mock payload if mockEnabled is true", async () => {
      const url = "/test";
      const method = "get";
      const status = 200;
      const config = { url, method, headers: {} as AxiosHeaders };
      const response = new MockInterceptor(config, { status });
      mocks.set(method, url, status);
      mocks.enable(true);
      try {
        await mockRequestInterceptor(config);
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it("should return the generic 404 mock payload if mockEnabled is true and method/url not supported", async () => {
      const url = "/not-configured";
      const method = "patch";
      const config = { url, method, headers: {} as AxiosHeaders };
      const response = new MockInterceptor(config, {
        status: 404,
        message: `${method.toUpperCase()} ${url} not mocked and/or configured`,
      });
      mocks.enable(true);
      try {
        await mockRequestInterceptor(config);
      } catch (error) {
        expect(error).toEqual(response);
      }
    });
  });

  describe("mockResponseErrorInterceptor", () => {
    it("should resolve the mock payload if the `error` is a mocked payload", async () => {
      const url = "/test";
      const method = "get";
      const status = 200;
      const config = { url, method, headers: {} as AxiosHeaders };
      const payload = new MockInterceptor(config, { status });
      mocks.set(method, url, status);
      mocks.enable(true);
      expect(await mockResponseErrorInterceptor(payload)).toEqual({
        statusText: "OK",
        headers: {},
        isMock: true,
        config,
        status,
      });
    });

    it("should reject the mock error if the `error` is a mocked error", async () => {
      const url = "/test";
      const method = "get";
      const status = 400;
      const message = "it is a test";
      const config = { url, method, headers: {} as AxiosHeaders };
      const payload = new MockInterceptor(config, { status, message });
      const error = new AxiosError(message, "EMOCKERROR", config as InternalAxiosRequestConfig);
      mocks.set(method, url, status);
      mocks.enable(true);
      expect(() => mockResponseErrorInterceptor(payload)).rejects.toThrow(error);
    });

    it("should reject the mock error if the `error` is a mocked error without a message", async () => {
      const url = "/test";
      const method = "get";
      const status = 400;
      const message = "mock error";
      const config = { url, method, headers: {} as AxiosHeaders };
      const payload = new MockInterceptor(config, { status });
      const error = new AxiosError(message, "EMOCKERROR", config as InternalAxiosRequestConfig);
      mocks.set(method, url, status);
      mocks.enable(true);
      expect(() => mockResponseErrorInterceptor(payload)).rejects.toThrow(error);
    });

    it("should reject the error if it is not mocked", async () => {
      const error = new Error("Ka Boom!");
      expect(() => mockResponseErrorInterceptor(error)).rejects.toThrowError(error);
    });
  });
});
