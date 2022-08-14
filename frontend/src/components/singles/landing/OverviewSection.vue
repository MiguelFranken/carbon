<template>
  <CryptoContainer>
    <div class="relative pixelated">
      <div
        class="flex flex-col-reverse lg:mx-auto lg:max-w-8xl lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start"
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
              What it is
            </h2>
            <div class="mt-6 text-gray-300 space-y-6">
              <ul class="nes-list is-circle mint-list pl-4 space-y-4">
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Decentralized generative art project living on Ethereum
                      Rinkeby testnet (for now)</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Unique digital collectibles (ERC721 NFTs)</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      ><span class="highlighted"
                        >10 different diamond sizes</span
                      >
                      and special dimaonds for minters having the largest wallet
                      balance at the time of minting</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Diamond size is determined
                      <span class="highlighted"
                        >how someone's wallet balance at the time of minting
                        compares with the wallet balance of previous
                        minters</span
                      >
                      at the time they minted their token</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Limited to <span class="highlighted">10000</span> unique
                      tokens</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Images and metadata stored on
                      <a
                        class="underline text-blueish italic"
                        href="https://github.com/miguelfranken/carbon-contract#ipfs"
                        >IPFS</a
                      >
                      and
                      <span class="highlighted">Filecoin</span> forever</span
                    >
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Collection on
                      <a class="underline text-blueish italic" href="#"
                        >OpenSea</a
                      >
                    </span>
                  </li>
                </SlideFadeRightContainer>
                <SlideFadeRightContainer>
                  <li class="highlighted">
                    <span class="mint-list-text"
                      >Smart contract is
                      <span class="highlighted"
                        >verified & publicly available</span
                      >
                      on
                      <a
                        class="underline text-blueish italic"
                        href="https://etherscan.io/address/0x2adcfafb356f0942b8432c036dda41f6c0d2877f"
                      >
                        Etherscan
                      </a>
                      and
                      <a
                        class="underline text-blueish italic"
                        href="https://github.com/miguelfranken/carbon-contract"
                      >
                        GitHub</a
                      >.
                    </span>
                  </li>
                </SlideFadeRightContainer>
              </ul>
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
              BALANCE NEEDED
            </h2>
            <div class="text-gray-300 pt-6">
              When minting, your diamond would currently have its size according
              to these balance intervals.
            </div>
            <LeaderboardTable />
          </div>
        </div>
      </div>
    </div>
  </CryptoContainer>
</template>

<script>
import CryptoContainer from "@/components/globals/CryptoContainer";
import { defineAsyncComponent } from "vue";
import SlideFadeRightContainer from "@/components/singles/SlideFadeRightContainer";
const LeaderboardTable = defineAsyncComponent(() =>
  import("@/components/singles/landing/LeaderBoardTable")
);
export default {
  name: "OverviewSection",
  components: { SlideFadeRightContainer, LeaderboardTable, CryptoContainer },
};
</script>

<style scoped>
.nes-list.is-circle li::before {
  color: unset;
  top: 2px;
}

.mint-list-text {
  display: block;
  @apply pl-2 text-gray-300;
}
</style>
