<template>
  <div>
    <main
      class="py-5 space-y-8"
      v-if="!tokenData.isLoading && !traitsData.isLoading"
    >
      <div
        class="flex justify-center text-3xl leading-6 font-medium text-gray-200"
      >
        <span>CryptoCock {{ tokenData.token.id }}</span>
      </div>
      <div class="flex justify-center items-center">
        <div class="max-w-2xl w-full">
          <div class="space-y-4">
            <img class="w-full rounded-md" :src="imgSrc" alt="" />
            <div class="mr-1 flex space-x-4">
              <a
                :href="ipfsMetadataHttp"
                type="button"
                class="whitespace-nowrap text-sm font-medium nes-btn pixelated w-full crypto-button-border-gray"
              >
                Metadata
              </a>
              <a
                :href="ipfsCockImageHttp"
                class="whitespace-nowrap text-sm font-medium nes-btn pixelated w-full crypto-button-border-gray"
              >
                Image
              </a>
            </div>
            <div class="mr-1.5">
              <a
                :href="openseaLink"
                type="button"
                class="whitespace-nowrap text-sm font-medium nes-btn pixelated w-full crypto-button-border-gray"
              >
                OpenSea
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-0">
        <div class="text-gray-200 space-y-12">
          <div class="space-y-8">
            <div class="space-y-2">
              <div>Current Owner</div>
              <router-link
                class="block truncate underline text-blueish italic"
                :to="'/accounts/' + tokenData.token.latestTransfer.to"
              >
                {{ tokenData.token.latestTransfer.to }}
              </router-link>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Length</span>
                <span>{{ length }}%</span>
              </div>
              <div class="mr-2">
                <progress
                  class="nes-progress cc-progress crypto-button-border-gray is-rounded pixelated cc-container"
                  :value="length"
                  max="100"
                ></progress>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Background Color</span>
                <span>{{
                  capitalizeFirstLetter(traitsData.traits.background_color)
                }}</span>
              </div>
              <div
                class="nes-container is-rounded pixelated cc-container"
                :style="{ backgroundColor: backgroundColor }"
              ></div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Color</span>
                <span>{{
                  capitalizeFirstLetter(traitsData.traits.color)
                }}</span>
              </div>
              <div
                class="nes-container is-rounded pixelated cc-container"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
            <div class="space-y-2">
              <div>Balance with which was minted</div>
              <div>{{ toEth(tokenData.token.balance) }}Ξ</div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <Stats v-if="!traitsData.isLoading" :traits="traitsData.traits" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const backgroundColorCodes = {
  black: "#2b2626",
  blue: "#31ebfa",
  yellow: "#f9ee71",
  green: "#31efa0",
  purple: "#d639ed",
  orange: "#ff8300",
  pink: "#ff5dc7",
};

const colorCodes = {
  blue: "#31ebfa",
  yellow: "#f9ee71",
  green: "#31efa0",
  wood: "#ab713f",
  bone: "#ffffff",
  purple: "#d639ed",
  orange: "#ff8300",
  pink: "#ff5dc7",
};

import useToken from "@/modules/token.js";
import Stats from "@/components/details/Stats";
import useTraits from "@/modules/traits";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    Stats,
  },

  computed: {
    ...mapGetters("accounts", ["getWeb3"]),
  },

  methods: {
    toEth(wei) {
      const split = this.getWeb3.utils.fromWei(wei, "ether").split(".");
      return split.length > 1
        ? `${split[0]}.${split[1].substr(0, 4)}`
        : split[0];
    },
  },

  setup() {
    const route = useRoute();
    const {
      loadToken,
      tokenData,
      getImageSrc,
      ipfsMetadataHttp,
      openseaLink,
      ipfsCockImageHttp,
    } = useToken();
    const { loadTraitsForTokenId, traitsData } = useTraits();

    const tokenId = route.params.id;
    loadToken(tokenId);
    loadTraitsForTokenId(tokenId);

    const imgSrc = computed(() => {
      if (tokenData.isLoading) {
        return null;
      }
      return getImageSrc(tokenData.token);
    });

    const length = computed(() => {
      if (traitsData.isLoading) {
        return null;
      }
      const rawLength = +traitsData.traits.length;
      return Math.min(10, rawLength) * 10;
    });

    const backgroundColor = computed(() => {
      if (traitsData.isLoading) {
        return null;
      }
      return backgroundColorCodes[traitsData.traits.background_color];
    });

    const color = computed(() => {
      if (traitsData.isLoading) {
        return null;
      }
      return colorCodes[traitsData.traits.color];
    });

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
      tokenData,
      capitalizeFirstLetter,
      backgroundColor,
      color,
      traitsData,
      length,
      tokenId,
      imgSrc,
      ipfsMetadataHttp,
      openseaLink,
      ipfsCockImageHttp,
      pages: [
        { name: "Cocks", href: "/cocks", current: false },
        { name: tokenId, href: `/cocks/${tokenId}`, current: true },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin progress-style($color) {
  &::-webkit-progress-value {
    background-color: $color;
  }
  &::-moz-progress-bar {
    background-color: $color;
  }
  &::-ms-fill {
    background-color: $color;
    border: none;
  }
}
//#b296cd

.cc-progress {
  @include progress-style(#701fe8);
}
</style>
