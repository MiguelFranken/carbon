<template>
  <MainHeader class="z-40" />

  <main class="wrapper-content z-10">
    <div
      :class="{
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16': route.name !== 'home',
      }"
    >
      <router-view />
    </div>
  </main>

  <CryptoNotifications />
</template>

<script>
import CryptoNotifications from "@/components/globals/CryptoNotifications.vue";
import MainHeader from "@/components/singles/MainHeader";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

export default {
  name: "App",

  components: {
    MainHeader,
    CryptoNotifications,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(async () => {
      await store.dispatch("accounts/initWeb3Modal");
      await store.dispatch("accounts/ethereumListener");
    });

    return {
      route,
    };
  },
};
</script>
