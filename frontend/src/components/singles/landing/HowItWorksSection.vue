<template>
  <CryptoContainer>
    <div class="relative mt-20 pixelated">
      <div
        class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start"
      >
        <div class="hidden lg:inline relative sm:py-16 lg:py-0">
          <div
            class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:pt-16"
          >
            <div class="relative overflow-hidden" style="height: 35vh">
              <img
                class="absolute inset-0 object-cover rounded-md opacity-90"
                src="/diamonds/10.png"
                alt="Largest diamond"
              />
            </div>
          </div>
        </div>

        <div
          class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
        >
          <!-- Content area -->
          <div class="pt-12 sm:pt-16 lg:pt-16">
            <h2
              class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
              style="color: #701fe8"
            >
              Size Matters!
            </h2>
            <div class="mt-6 text-gray-300 space-y-6">
              <p class="text-base leading-7">
                There are
                <span class="highlighted">10 different diamond sizes</span> and
                <span class="highlighted">
                  the size of yours depends on your ETH balance on your
                  connected MetaMask wallet</span
                >
                at the time you mint your diamond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CryptoContainer>
</template>

<script>
import CryptoContainer from "@/components/globals/CryptoContainer";

export default {
  name: "HowItWorksSection",

  components: {
    CryptoContainer,
  },
};
</script>
