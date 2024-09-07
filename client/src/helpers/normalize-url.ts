export const normalizeUrl = (url: string) => {
  return url.split("?")[0].toLowerCase();
};
