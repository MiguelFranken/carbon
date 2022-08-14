<template>
  <CryptoContainer>
    <div
      class="pt-8 lg:pt-8 overflow-hidden pixelated py-0"
      :class="{ 'pb-8 lg:pb-16': pb }"
    >
      <div class="relative max-w-xl mx-auto lg:max-w-7xl">
        <div class="relative">
          <h2
            class="text-left lg:text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl uppercase"
            style="color: #701fe8"
          >
            {{ title }}
          </h2>
          <div
            class="text-left lg:text-center text-sm leading-0 lg:leading-8 uppercase highlighted"
          >
            {{ subtitle }}
          </div>
          <p
            class="mt-4 max-w-4xl mx-auto text-left lg:text-center leading-7 text-lg lg:text-xl text-gray-300"
          >
            <span class="content"><slot /></span>
          </p>
        </div>
      </div>
    </div>
  </CryptoContainer>
</template>

<script>
import CryptoContainer from "@/components/globals/CryptoContainer";
export default {
  name: "CryptoSectionCentered",
  components: { CryptoContainer },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    pb: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.content > p {
  @apply mt-4 first:mt-0;
}
</style>
