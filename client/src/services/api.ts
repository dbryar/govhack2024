import axios, { type AxiosInstance, type AxiosRequestConfig, AxiosResponse } from "axios";

import { getTokenValue } from "@/boot/axios";
import { AxiosAuth } from "@/models";
import { Logger } from "@/services/logger";
import { mockRequestInterceptor, mockResponseErrorInterceptor } from "@/services/mocks";
import SessionStore from "@/services/session-store";

export interface IRestApi {
  /**
   * Make an API call on the configured RESTful service, using the default client token acquirer if an auth service is provided
   * @param input { string | AxiosRequestConfig } GET a url path, or use a full Axios Request object
   */
  call<T = unknown>(input: string | AxiosRequestConfig): Promise<{ status: number; data: T }>;
}

/**
 * Common API class to extend a REST API consumer service.
 *
 * Handles token acquisition and provides a common Axios `call` function with built-in logging, mocking and error handling
 */
export class RestApi implements IRestApi {
  private axios: AxiosInstance;

  constructor(
    baseUrl: string | undefined,
    readonly logger: Logger,
    private auth: AxiosAuth = {
      header: "Authorization",
      getTokenValue,
      prefix: "Bearer ",
    }
  ) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json" },
    });

    this.axios.interceptors.request.use(async (request) => {
      const config = { ...request };

      if (
        !config.headers.get("Authorization") &&
        !config.headers.get(this.auth.header) &&
        this.auth
      ) {
        const token = await this.auth.getTokenValue();
        if (token) config.headers.set(this.auth.header, `${this.auth.prefix ?? ""}${token}`);
      }

      // set session ID as a cookie
      const sessionId = SessionStore.get<string>("sid");
      if (sessionId) config.headers.set("Cookie", `sid=${sessionId}`);

      this.logger.debug(`axios::${config.method?.toUpperCase()} ${this.logUrl(config)}`);
      if (config.headers) this.logger.debug("axios::headers", config.headers);
      if (config.data) this.logger.debug("axios::data", { data: config.data });

      return mockRequestInterceptor(config);
    }, undefined);

    this.axios.interceptors.response.use(
      (value: AxiosResponse) => Promise.resolve(value),
      mockResponseErrorInterceptor
    );

    this.logger.debug(`API initialised with${baseUrl ? " base URL " + baseUrl : "out a base URL"}`);
  }

  // Axios already does this; it is purely for logging/output to console
  private logUrl = (config: AxiosRequestConfig): string =>
    config.url?.startsWith("http") ? config.url : `${config.baseURL ?? "/"}${config.url}`;

  call = async <T = unknown>(input: string | AxiosRequestConfig) => {
    const { ...config } = typeof input == "string" ? ({ url: input } as AxiosRequestConfig) : input;
    if (!config.method && !config.data) config.method = "get"; // default method for string only URL call
    if (!config.method && config.data) config.method = "post"; // default method for call with data payload

    try {
      const now = Date.now();
      const { status, statusText, data } = await this.axios<T>(config);

      this.logger.info(
        `axios::success ${config.method?.toUpperCase()} ${this.logUrl(config)} (${
          Date.now() - now
        }ms)`
      );
      this.logger.debug({ status, statusText, data });

      return { status, data };
    } catch (err: unknown) {
      return Promise.reject(err);
    }
  };
}
