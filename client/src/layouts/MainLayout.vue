<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, provide, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const q = useQuasar();
    const { t: i18n, locale } = useI18n();
    const isDarkMode = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ?? false);
    const isDevelop = import.meta.env.DEV;
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };

    q.dark.set(isDarkMode.value);

    watch(
      () => isDarkMode.value,
      (val) => {
        q.dark.set(val);
        console.info(val ? "Switch to dark mode" : "Switch to light mode");
      },
    );

    provide("i18n", i18n);
    provide("locale", locale);
    provide("isDarkMode", isDarkMode);
    provide("isDevelop", isDevelop);
    provide("toggleDarkMode", toggleDarkMode);
  },
});
</script>
