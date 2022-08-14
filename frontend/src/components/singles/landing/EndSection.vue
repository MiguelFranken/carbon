<template>
  <CryptoContainer>
    <div class="relative pixelated">
      <div
        class="flex flex-col-reverse lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start"
      >
        <div
          class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
        >
          <!-- Content area -->
          <div class="pt-12 sm:pt-16 lg:pt-20">
            <h2
              class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
              style="color: #701fe8"
            >
              First Fair priced project
            </h2>
            <div class="mt-6 text-gray-300 space-y-6">
              <p>
                As this is the
                <span class="highlighted">first fair-priced NFT project</span>
                out there, the pricing depends on your current wallet balance.
              </p>
              <p>
                To be precise:
                <span class="highlighted"
                  >Pricing equals 1% of your wallet balance.</span
                >
              </p>
            </div>
          </div>
        </div>
        <div
          class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
        >
          <div class="pt-12 sm:pt-16 lg:pt-20">
            <h2
              class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
              style="color: #701fe8"
            >
              Join the community
            </h2>
            <div class="space-y-8">
              <div class="mt-6 text-gray-300 space-y-6">
                <p>
                  Join us on <span class="highlighted">Discord</span> and
                  <span class="highlighted">Telegram</span> to make sure you
                  don't miss anything! Discuss with the community, make
                  suggestions and show which CryptoCock you got!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="mt-8 lg:mt-6 grid grid-cols-1 gap-16 md:grid-cols-2 lg:mt-0">
        <button
          class="flex items-center justify-center whitespace-nowrap text-2xl font-bold antialiased tracking-wider nes-btn pixelated cock-button py-6"
          @click="openDiscord"
        >
          <span class="mr-3">Join</span>
          <CryptoImage
            imgClass="max-h-12 opacity-70 mr-4"
            src="/landing/socials/discord.png"
            alt="Discord"
          />
          <span class="mr-3">Now</span>
        </button>
        <button
          class="flex items-center justify-center whitespace-nowrap text-2xl font-bold antialiased tracking-wider nes-btn pixelated cock-button py-6"
          @click="openTelegram"
        >
          <span class="mr-3">Join</span>
          <CryptoImage
            imgClass="max-h-12 opacity-70 mr-4"
            src="/landing/socials/telegram.png"
            alt="Telegram"
          />
          <span class="mr-3">Now</span>
        </button>
      </div>
    </div>
  </CryptoContainer>
</template>

<script>
import CryptoImage from "@/components/globals/CryptoImage";
import CryptoContainer from "@/components/globals/CryptoContainer";
export default {
  name: "EndSection",

  components: { CryptoContainer, CryptoImage },

  methods: {
    openTelegram() {
      window.open("https://t.me/cryptococks", "_blank").focus();
    },

    openDiscord() {
      window.open("https://discord.gg/H7JNjRHCbD", "_blank").focus();
    },
  },
};
</script>
