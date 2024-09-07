<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      class="col-12 col-sm-8 col-md-6 col-lg-4"
      :flat="isMobile() || isDarkMode"
      :style="
        isMobile()
          ? 'width: 100vw; height: 100vh'
          : 'max-width:512px; max-height: 90vh; height: 768px'
      "
    >
      <img
        :src
        alt="client logo"
        class="q-pa-md"
        style="
          max-height: 20vh;
          width: auto;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        "
      />
      <q-card-section class="text-h6"
        >{{ render(title) }}{{ name ? ` ${name}.` : "!" }}</q-card-section
      >
      <q-card-section class="text-body1">{{ render(Language.bodyWelcome) }}</q-card-section>

      <form autofocus>
        <q-card-section class="q-gutter-sm">
          <q-input v-model="message" type="textarea" filled autogrow />
        </q-card-section>

        <q-card-actions class="q-pr-md" align="right">
          <q-btn @click="send" :label="render(Language.buttonSend)" color="primary" />
        </q-card-actions>
      </form>

      <q-card-section v-if="isDevelop">
        <q-toggle v-model="isDarkMode" @input="toggleDarkMode" label="Dark Mode" />
        <q-toggle v-model="locale" true-value="en-US" false-value="de-DE" label="Language" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-vue-v3";
import { useQuasar } from "quasar";
import { computed, defineComponent, inject, type Ref, ref } from "vue";

// import { useRoute } from "vue-router";
import { Language, R } from "@/models";
import { api, logger } from "@/services";
import SessionStore from "@/services/session-store";

export default defineComponent({
  name: "IndexPage",
  components: {},

  setup() {
    const isDarkMode = inject<Ref<boolean>>("isDarkMode");
    const isDevelop = inject<boolean>("isDevelop");
    const isLoading = ref(false);
    const i18n = inject<(v: unknown, p?: R) => string>("i18n")!;
    const locale = inject<string>("locale")!;
    const name = SessionStore.get<string>("name");
    const title = name ? Language.headingWelcomeBack : Language.headingWelcome;
    const message = ref("");

    logger.debug("IndexPage");

    const src = computed(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--logo-url")
        .trim()
        .replace(/(^url\("?)|(\)$)/g, "");
    });

    const { data: fingerprint } = useVisitorData({ extendedResult: false }, { immediate: true });

    const fn = {
      isMobile: () => {
        return useQuasar().screen.lt.sm || "ontouchstart" in window || navigator.maxTouchPoints > 0;
      },
      toggleDarkMode: inject<() => void>("toggleDarkMode"),
      render: (v?: string | number) => {
        if (!v && v !== 0) return "";
        return typeof v === "number" ? i18n(v) : v;
      },
      send: async () => {
        logger.debug("Send", message.value);
        isLoading.value = true;
        await api
          .call({
            url: "/v1/users",
            data: { message: message.value, user_id: fingerprint.value?.visitorId },
          })
          .then((res) => {
            logger.debug("Response", res);
          })
          .catch((err) => {
            logger.error("Error", err);
          })
          .finally(() => {
            isLoading.value = false;
          });
      },
    };

    return {
      title,
      name,
      message,
      ...fn,
      i18n,
      isDarkMode,
      isDevelop,
      isLoading,
      Language,
      locale,
      src,
    };
  },
});
</script>

<style lang="scss">
body.body--dark {
  background-color: $dark;
}
</style>
