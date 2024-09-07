/**
 * Used to store the authentication token or API key required to communicate with the orchestration service
 */
export type AxiosAuth = {
  header: string;
  prefix?: string;
  getTokenValue: (...args: unknown[]) => Promise<string>;
  store?: unknown;
};
