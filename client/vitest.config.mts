// https://vitejs.dev/config/

import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";

const rootFolder = fileURLToPath(new URL(".", import.meta.url));
const resolve = (path: string) => join(rootFolder, path);

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

function getReporterConfig() {
  if (process.env.GITHUB_ACTIONS) {
    return {
      outputFile: "test-results/report.xml",
      reporters: "junit",
    };
  }

  return {};
}

export default defineConfig(() => {
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),

      quasar({
        devTreeshaking: true,
        sassVariables: "src/quasar-variables.scss",
        autoImportComponentCase: "combined",
      }),

      tsconfigPaths(),
    ],

    resolve: {
      alias: {
        testing: resolve("."),
        quasar: resolve(".."),
        "@": resolve("./src"),
      },
    },

    test: {
      ...getReporterConfig(),
      globals: true,
      environment: "jsdom",
      environmentOptions: {
        pretendToBeVisual: true,
      },
      // browser: {
      //   enabled: true,
      //   headless: true,
      //   name: 'chrome'
      // },
      css: {
        include: [/.+/],
      },
      include: ["../src/**/*.spec.ts"],
      setupFiles: ["vitest-localstorage-mock", "./tests/setup-file.ts"],
    },
  };
});
