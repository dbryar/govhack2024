// eslint-disable-next-line import/no-named-as-default
import Axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { bindLogger, Container } from ".";

const cookieJar = new CookieJar();

const axios = wrapper(
  Axios.create({
    jar: cookieJar,
  })
);

export const bindAxios = (container: Container): AxiosInstance => {
  if (container.bind(container.keys.Axios, axios)) {
    const logger = bindLogger(container);
    logger.debug("Binding Axios instance to container");
  }
  return container.get<AxiosInstance>(container.keys.Axios);
};
