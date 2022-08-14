<template>
  <div>
    <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }">
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 pixelated max-w-full px-4"
      >
        <!-- Days -->
        <div
          class="bg-transparent flex items-center justify-end lg:justify-center relative"
        >
          <div
            class="mix-blend-screen date-tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-40 lg:h-24 rounded-md"
          >
            <div class="text-3xl">{{ days }}</div>
            <div class="text-md">Days</div>
          </div>
          <div class="absolute w-32 right-full lg:block hidden">
            <CryptoImage
              src="/landing/cocks/countdown/left.png"
              alt="Left facing cock"
              imgStyle="transform: scaleX(-1);"
            />
          </div>
        </div>

        <!-- Hours -->
        <div
          class="bg-transparent flex items-center justify-start lg:justify-center"
        >
          <div
            class="mix-blend-screen date-tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-40 lg:h-24 rounded-md"
          >
            <div class="text-3xl">{{ hours }}</div>
            <div class="text-md">Hours</div>
          </div>
        </div>

        <!-- Minutes -->
        <div
          class="bg-transparent flex items-center justify-end lg:justify-center"
        >
          <div
            class="mix-blend-screen date-tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-40 lg:h-24 rounded-md"
          >
            <div class="text-3xl">{{ minutes }}</div>
            <div class="text-md">Minutes</div>
          </div>
        </div>

        <!-- Seconds -->
        <div
          class="bg-transparent flex items-center justify-start lg:justify-center relative"
        >
          <div
            class="mix-blend-screen date-tile pixelated font-semibold flex flex-col items-center justify-center w-full h-24 lg:w-40 lg:h-24 rounded-md"
          >
            <div class="text-3xl">{{ seconds }}</div>
            <div class="text-md">Seconds</div>
          </div>
          <div class="absolute w-32 left-full lg:block hidden">
            <CryptoImage
              src="/landing/cocks/countdown/right.png"
              alt="Right facing cock"
            />
          </div>
        </div>
      </div>
    </vue-countdown>

    <div class="flex justify-center items-center text-center w-full mt-6">
      <h1 class="pixelated uppercase text-2xl text-white animate-pulse">
        Public-Sale Start
      </h1>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import CryptoImage from "@/components/globals/CryptoImage";

export default {
  name: "Countdown",

  components: {
    VueCountdown,
    CryptoImage,
  },

  data() {
    const now = new Date();
    const publicSaleDate = new Date(2022, 1, 1, 20);

    return {
      time: publicSaleDate - now,
    };
  },

  computed: {},
};
</script>

<style scoped>
.date-tile {
  background-color: #701fe8;
  opacity: 1;
}
</style>
