import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { logAxiosError, normalizeUrl } from "@/helpers";
import { MockResponse, R } from "@/models";
import { logger } from "@/services";

interface MockAxiosRequestConfig extends InternalAxiosRequestConfig {
  method: string;
  url: string;
}

export interface IMocks {
  enable(state: boolean): void;
  get(method: string, url: string): MockResponse<unknown> | undefined;
  set<T>(method: string, url: string, status: number, data?: T): void;
  clear(): void;
  getMockPayload(mock: MockInterceptor): Promise<Partial<AxiosResponse>>;
  setMockPayload(config: MockAxiosRequestConfig): Promise<never>;
}

export class MockInterceptor extends Error {
  constructor(public config: MockAxiosRequestConfig, public response: MockResponse<unknown>) {
    super(response.message);
  }
}

export class Mocks implements IMocks {
  private static _instance: Mocks;
  protected mocks: R<R<MockResponse>> = {};
  public mockEnabled: boolean;

  private constructor() {
    this.mockEnabled = false;
  }

  public static getInstance() {
    if (!this._instance) this._instance = new Mocks();
    return this._instance;
  }

  public static isMocked(error: unknown): error is MockInterceptor {
    return error instanceof MockInterceptor;
  }

  enable(state: boolean): void {
    this.mockEnabled = state;
  }

  get(method: string, url: string): MockResponse | undefined {
    const host = normalizeUrl(url);
    return this.mocks[host] ? this.mocks[host][method.toLowerCase()] : undefined;
  }

  set<T>(method: string, url: string, status: number, data?: T): void {
    const host = normalizeUrl(url);
    if (!this.mocks[host]) this.mocks[host] = {};
    this.mocks[host][method.toLowerCase()] =
      typeof data == "string" ? { status, message: data } : { status, data };
  }

  clear(): void {
    this.mocks = {};
  }

  getMockPayload(mock: MockInterceptor): Promise<Partial<AxiosResponse>> {
    const { response, config } = mock;
    // Handle mocked error (any non-2xx status code)
    if (response.status && response.status > 299) {
      const err = new AxiosError(
        response.message ?? "mock error",
        "EMOCKERROR",
        config as InternalAxiosRequestConfig,
        undefined,
        response as AxiosResponse
      );
      return Promise.reject(err as AxiosError);
    }
    // Handle mocked success
    return Promise.resolve({ statusText: "OK", headers: {}, config, isMock: true, ...response });
  }

  setMockPayload(config: MockAxiosRequestConfig): Promise<never> {
    const payload = this.mockPayload(config.url, config.method.toLowerCase());
    return Promise.reject(new MockInterceptor(config, payload));
  }

  private mockPayload = (url: string, method: string): MockResponse => {
    const payload = this.get(method, url);
    if (payload) return payload;
    else
      return {
        status: 404,
        message: `${method.toUpperCase()} ${normalizeUrl(url)} not mocked and/or configured`,
      };
  };
}

/**
 * Enable mocking capability in Axios by adding the following to an axios instance
 * `this.axios.interceptors.request.use(mockRequestInterceptor, undefined);`
 * `this.axios.interceptors.response.use(undefined, mockResponseErrorInterceptor);`
 */
export const mockRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (Mocks.getInstance().mockEnabled) {
    const mockConfig = {
      method: "get",
      url: "/",
      ...config,
    };
    logger.info(`axios::mocking ${mockConfig.method.toUpperCase()} ${mockConfig.url}`);
    const response = Mocks.getInstance().setMockPayload(mockConfig);
    response.catch((payload) => logger.debug("axios::mocked", payload.response));
    return response;
  }
  return config;
};

/**
 * Enable mocking capability in Axios by adding the following to an axios instance
 * `this.axios.interceptors.request.use(mockRequestInterceptor, undefined);`
 * `this.axios.interceptors.response.use(undefined, mockResponseErrorInterceptor);`
 */
export const mockResponseErrorInterceptor = (error: unknown) => {
  if (Mocks.isMocked(error)) {
    return Mocks.getInstance().getMockPayload(error);
  }
  logAxiosError(error);
  return Promise.reject(error);
};
