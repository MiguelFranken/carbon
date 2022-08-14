<template>
  <CryptoContainer>
    <div class="relative mt-20 pixelated">
      <div
        class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start"
      >
        <div class="hidden lg:inline relative sm:py-16 lg:py-0">
          <!-- Background -->
          <div
            aria-hidden="true"
            class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <!-- Pointed Background SVG -->
            <svg
              class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12 opacity-50"
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="#701fe8"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div
            class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:pt-16"
          >
            <div class="relative overflow-hidden" style="height: 35vh">
              <img
                class="absolute inset-0 object-cover rounded-md opacity-90"
                src="/landing/how-it-works/cock.svg"
                alt="How it works"
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
                <span class="highlighted">10 different cock lengths</span> and
                <span class="highlighted">
                  the length of yours depends on your ETH balance on your
                  connected MetaMask wallet</span
                >
                at the time you mint your cock.
              </p>

              <p class="text-base leading-7">
                Whales get a massive long dong, krills get a teensy-weensy
                schlong.
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
