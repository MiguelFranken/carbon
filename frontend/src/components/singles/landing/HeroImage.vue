<template>
  <div class="relative inset-0">
    <CryptoImage
      src="/landing/banner.png"
      imgClass="lg:w-full object-cover banner"
      imgLoading="eager"
      alt="Banner"
    />
    <!--    <div class="absolute inset-0 flex items-center justify-center">
      <CryptoImage
        src="/landing/logo.png"
        alt="Logo"
        imgClass="px-4 w-full lg:w-1/2"
        imgLoading="eager"
      />
    </div>-->

    <!--    <div
      class="hidden lg:flex absolute w-full flex items-center justify-center"
      style="bottom: 5%"
    >
      <Countdown />
    </div> -->
    <div
      class="hidden lg:flex absolute w-full flex items-center justify-center"
      style="bottom: 5%"
    >
      <MintCounter />
    </div>
  </div>
</template>

<script>
//import Countdown from "./Countdown";
import MintCounter from "./MintCounter";
import CryptoImage from "@/components/globals/CryptoImage";
export default {
  name: "HeroImage",
  components: {
    // Countdown,
    MintCounter,
    CryptoImage,
  },
};
</script>

<style lang="scss">
.banner {
  height: 75vh;
}

@media (min-width: 768px) {
  .banner {
    height: unset;
  }
}
</style>
