import Axios from "axios";

import { R } from "@/models";
import { logger, RestApi } from "@/services";

const axiosConfig: R<string | undefined> = {
  api: undefined,
  host: undefined,
};
const axiosEnv = import.meta.env;

for (const key in axiosEnv) {
  if (key.startsWith("VITE_AXIOS"))
    axiosConfig[key.replace("VITE_AXIOS_", "").toLowerCase()] = axiosEnv[key];
}

// The API base URL, including version path if applicable (e.g. /v1/api)
const baseUrl = axiosConfig.api;

// The hosting base URL from where assets can be programmatically requested (e.g. https://assets.example.com)
const baseURL = axiosConfig.host;

export const axios = Axios.create({ baseURL });
export const api = new RestApi(baseUrl, logger);
