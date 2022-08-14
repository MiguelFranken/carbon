<template>
  <div class="pixelated max-w-full px-4">
    <div
      class="bg-transparent flex items-center justify-end lg:justify-center relative"
    >
      <div class="absolute w-32 right-full lg:block hidden">
        <CryptoImage
          src="/landing/cocks/countdown/left.png"
          alt="Left facing cock"
          imgStyle="transform: scaleX(-1);"
        />
      </div>
      <div
        class="mix-blend-screen tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-50 lg:h-24 rounded-md"
      >
        <div class="text-3xl text-white">{{ currentCount }}</div>
        <div class="text-md text-white">Cocks already minted</div>
      </div>
      <div class="absolute w-32 left-full lg:block hidden">
        <CryptoImage
          src="/landing/cocks/countdown/right.png"
          alt="Right facing cock"
        />
      </div>
    </div>
    <!-- <div class="flex justify-center items-center text-center w-full mt-6">
      <router-link
        class="text-sm font-medium nes-btn"
        :class="{
          'crypto-button-border-gray': routeName !== 'home',
          'cock-button crypto-button-border-blue': routeName === 'mint',
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
import CryptoImage from "@/components/globals/CryptoImage";

export default {
  name: "MintCounter",
  components: {
    CryptoImage,
  },
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
