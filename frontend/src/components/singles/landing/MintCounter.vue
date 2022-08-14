<template>
  <div class="pixelated max-w-full px-4">
    <div
      class="bg-transparent flex items-center justify-end lg:justify-center relative"
    >
      <div
        class="mix-blend-screen tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-50 lg:h-24"
      >
        <div class="text-3xl text-white">{{ currentCount }}</div>
        <div class="text-md text-white">Diamonds already minted</div>
      </div>
    </div>
    <!-- <div class="flex justify-center items-center text-center w-full mt-6">
      <router-link
        class="text-sm font-medium nes-btn"
        :class="{
          'crypto-button-border-gray': routeName !== 'home',
          'diamond-button crypto-button-border-blue': routeName === 'mint',
        }"
        to="/mint"
      >
        Get yours
      </router-link>
    </div> -->
  </div>
</template>
<script>
import useToken from "@/modules/token";

export default {
  name: "MintCounter",
  data() {
    return {
      currentCount: 0,
    };
  },
  created() {
    const { getTokenCount } = useToken();
    getTokenCount().then((count) => (this.currentCount = count));
  },
};
</script>
<style scoped>
.tile {
  background-color: #701fe8;
  opacity: 1;
  padding: 50px 70px;
}
</style>
