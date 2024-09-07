export type MockResponse<T = unknown> = {
  status: number;
  data?: T;
  message?: string;
};
