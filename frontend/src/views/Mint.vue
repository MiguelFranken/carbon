<template>
  <div>
    <div class="grid grid-cols-10 gap-x-8">
      <div class="space-y-10 col-span-6">
        <CryptoSectionLeft
          title="MINTING"
          subtitle="10,000 juicy cocks – and you can get one of them!"
        >
          <p class="text-lg text-gray-300">
            Mint your CryptoCock before everyone else and become part of our
            incredible CryptoCocks community.
          </p>
        </CryptoSectionLeft>
        <div class="text-md">
          <div>
            <ul class="nes-list is-circle mint-list pl-4 space-y-4">
              <SlideFadeRightContainer :delay="0.1">
                <li class="highlighted">
                  <span class="mint-list-text">10 different cock lengths</span>
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.2">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >Cock length depends on your wallet balance</span
                  >
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.3">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >Cocks of minters with the largest balance at the time of
                    minting will always receive a special property, namely
                    <i>'All Time High'</i>. These Cocks are edged with a
                    rainbow!</span
                  >
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.4">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >Pricing equals 1% of your wallet balance (min. ETH 0.02).
                    0% during pre-sale!</span
                  >
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.5">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >30% donated to "Trees for the Future"</span
                  >
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.6">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >Our smart contract is verified & publicly available on
                    Etherscan</span
                  >
                </li>
              </SlideFadeRightContainer>
              <SlideFadeRightContainer :delay="0.7">
                <li class="highlighted">
                  <span class="mint-list-text"
                    >Only one NFT per Wallet mintable</span
                  >
                </li>
              </SlideFadeRightContainer>
            </ul>
          </div>
        </div>
        <button
          type="button"
          @click="mint"
          :disabled="!isMintingEnabled"
          class="w-full flex items-center justify-center px-8 py-4 border border-transparent text-m leading-5 font-bold focus:outline-none nes-btn mt-16"
          :class="{
            'is-disabled cursor-not-allowed': !isMintingEnabled,
          }"
        >
          {{ mintButtonText }}
        </button>
      </div>
      <div class="col-span-4">
        <MintImages />
      </div>
    </div>

    <teleport to="body">
      <MintModal ref="modal" :status="status" :token="mintedTokenId" />
    </teleport>
  </div>
</template>
<script>
import MintImages from "@/views/MintImages";
import MintModal from "@/components/mint/MintModal";
import { mapGetters } from "vuex";
import SlideFadeRightContainer from "@/components/singles/SlideFadeRightContainer";
import CryptoSectionLeft from "@/components/landing/CryptoSectionLeft";

export default {
  components: {
    SlideFadeRightContainer,
    MintModal,
    MintImages,
    CryptoSectionLeft,
  },

  computed: {
    isMintingEnabled() {
      return (
        this.isUserConnected &&
        this.getTokens.length === 0 &&
        this.getChainId !== 0x1
      );
    },

    mintButtonText() {
      if (this.isUserConnected) {
        if (this.getChainId !== "0x1") {
          return "Mint only on Ethereum Mainnet";
        } else if (this.getTokens.length > 0) {
          return "Only One NFT Per Wallet";
        }
        return "Mint";
      } else {
        return "Connect Wallet To Mint";
      }
    },

    ...mapGetters("accounts", [
      "getActiveAccount",
      "isUserConnected",
      "isWhitelisted",
      "isCheckingWhitelisting",
      "getTokens",
      "getChainId",
    ]),
  },

  data() {
    return {
      status: null,
      mintedTokenId: null,
    };
  },

  methods: {
    async mint() {
      this.$refs.modal.open = true;
      this.status = "confirming";
      try {
        const mintPromises = await this.$store.dispatch("mint/mint");
        console.log(mintPromises);
        mintPromises.confirmation.then((transactionHash) => {
          this.status = "confirmed";
          console.log("Transaction confirmed", transactionHash);
        });

        mintPromises.receipt
          .then((receipt) => {
            this.mintedTokenId = receipt.events.Transfer.returnValues.tokenId;
            console.log(
              "Successfully minted cock",
              receipt,
              this.mintedTokenId
            );
            this.status = "minted";
            this.$notifications.success(
              "The minting of your cock is now complete!"
            );
          })
          .catch((error) => {
            console.error("error occurred", error);
            this.handleError(error);
          });
      } catch (e) {
        console.log("catch error", e);
        this.handleError(e);
      }
    },

    handleError(error) {
      if (error.message && error.message.includes("ONLY_ONE_NFT_PER_ADDRESS")) {
        this.$notifications.error("You can only mint one NFT per wallet!");
      } else if (
        error.message &&
        error.message.includes("User denied transaction signature")
      ) {
        this.$notifications.error("Canceled transaction request");
      } else {
        this.$notifications.error("Error occurred during the minting process!");
      }

      this.$refs.modal.open = false;
    },
  },
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
