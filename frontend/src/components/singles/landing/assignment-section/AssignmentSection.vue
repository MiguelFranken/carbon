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
          <div>
            <h2
              class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
              style="color: #701fe8"
            >
              How large will your diamond be?
            </h2>
            <div class="mt-6 text-gray-300 space-y-6">
              <p class="text-lg">
                We store
                <span class="highlighted"
                  >on-chain the wallet balances of all minters</span
                >
                for comparison.
              </p>
              <p class="text-lg">
                We calculate the
                <span class="highlighted"
                  >percentage of balances that are less than the minter's
                  current wallet balance</span
                >.
              </p>
              <p class="text-lg">
                Percentages [0,10) are mapped to diamond size 1, [10,20) to
                diamond size 2, ..., [90,100) to diamond size 10.
              </p>
              <p class="text-lg">
                Only the
                <span class="highlighted"
                  >largest balance at the time of minting</span
                >
                will receive a special NFT.
              </p>
            </div>
          </div>
        </div>

        <div class="relative sm:py-16 lg:py-0">
          <div
            class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:pb-20"
          >
            <DiamondPreview class="relative" />
          </div>
        </div>
      </div>
    </div>
  </CryptoContainer>
</template>

<script>
import DiamondPreview from "./DiamondPreview";
import CryptoContainer from "@/components/globals/CryptoContainer";
export default {
  name: "AssignmentSection",

  components: { CryptoContainer, DiamondPreview },
};
</script>
