import {
  FingerprintJSPro,
  fpjsPlugin,
  FpjsVueOptions,
} from "@fingerprintjs/fingerprintjs-pro-vue-v3";
import { boot } from "quasar/wrappers";

import { R } from "@/models";

const fpConfig: R<string | undefined> = {
  host: undefined,
  pattern: undefined,
  key: undefined,
};
const env = import.meta.env;

for (const key in env) {
  if (key.startsWith("VITE_FINGERPRINT"))
    fpConfig[key.replace("VITE_FINGERPRINT_", "").toLowerCase()] = env[key];
}
const { host, pattern, api_key } = fpConfig;

export default boot(({ app }) => {
  const fpPluginOptions: FpjsVueOptions = {
    loadOptions: {
      apiKey: api_key ?? "",

      endpoint: [
        // The host from where fingerprint can be requested (e.g. https://metrics.example.com)
        host ?? FingerprintJSPro.defaultEndpoint,
      ],
      scriptUrlPattern: [
        // The replacement pattern for variable (e.g. /v<version>/<apiKey>/loader_v<loaderVersion>.js)
        pattern ?? FingerprintJSPro.defaultScriptUrlPattern,
      ],
      // region: 'eu',
    },
  };

  // Set i18n instance on app
  app.use(fpjsPlugin, fpPluginOptions);
});
