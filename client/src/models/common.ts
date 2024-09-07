export type R<T = unknown> = Record<string, T>;

/** ID Reference, for linked objects available from the datastore */
export type IRef = {
  [key: string]: unknown;
  id: string;
  name?: string;
};
