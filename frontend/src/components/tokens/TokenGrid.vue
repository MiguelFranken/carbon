<template>
  <div>
    <div class="hidden md:block pb-4">
      <h2
        class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
        style="color: #701fe8"
      >
        GALLERY
      </h2>
      <div class="text-gray-300 pt-4">
        <div>All minted diamonds.</div>
      </div>
    </div>
    <ul
      v-if="!tokensData.isLoading"
      role="list"
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
    >
      <li v-for="token in tokensData.tokens" :key="token.id" class="relative">
        <div
          class="group block w-full rounded-md overflow-hidden transition transform hover:scale-105"
          @click="showToken(token)"
        >
          <img
            :src="getImageSrc(token)"
            alt=""
            class="object-cover pointer-events-none"
          />
          <button
            type="button"
            class="absolute inset-0 focus:outline-none hover:nes-pointer"
          >
            <span class="sr-only">View details for token {{ token.id }}</span>
          </button>
        </div>
        <p
          class="mt-1 block text-sm font-medium text-gray-300 truncate pointer-events-none space-x-2 flex items-start justify-start"
        >
          <span
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blueish bg-opacity-50"
            style="color: #b296cd"
          >
            <svg
              class="mr-1.5 h-2 w-2"
              style="color: #b296cd"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            {{ token.id }}
          </span>
          <span
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blueish bg-opacity-50"
            style="color: #b296cd"
          >
            {{ toEth(token.balance) }}Ξ
          </span>
        </p>
      </li>
    </ul>
    <div v-if="tokensData.isLoading" class="text-gray-300 pt-4">
      Loading diamonds...
    </div>
  </div>
</template>

<script>
import useTokens from "@/modules/tokens";
import useToken from "@/modules/token";
import { mapGetters } from "vuex";

export default {
  name: "TokenGrid",

  emit: ["token::click"],

  computed: {
    ...mapGetters("accounts", ["getWeb3"]),
  },

  methods: {
    showToken(token) {
      this.$emit("token::click", token);
    },

    toEth(wei) {
      const split = this.getWeb3.utils.fromWei(wei, "ether").split(".");
      return split.length > 1
        ? `${split[0]}.${split[1].substr(0, 4)}`
        : split[0];
    },
  },

  setup() {
    const { tokensData } = useTokens();
    const { getImageSrc } = useToken();

    return {
      tokensData,
      getImageSrc,
    };
  },
};
</script>

<style scoped></style>
