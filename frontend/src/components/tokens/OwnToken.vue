<template>
  <div v-if="getTokens.length > 0">
    <div class="relative pixelated">
      <div class="py-4 sm:py-8 lg:py-12">
        <h2
          class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
          style="color: #701fe8"
        >
          YOUR COCKS
        </h2>
        <div class="text-gray-300 pt-4">
          <div>
            In total, {{ getTokens.length }}
            {{ getTokens.length > 1 ? "CryptoCocks" : "CryptoCock" }} could be
            found in your wallet.
          </div>
          <div class="pt-4">
            <router-link
              v-for="token in getTokens"
              :key="token.id"
              :to="'/cocks/' + token.id"
              class="text-sm font-medium nes-btn crypto-button-border-gray nes-pointer mb-4 mr-4"
            >
              CryptoCock #{{ token.id }} ({{ getCockLength(token) }}%)
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("accounts", ["getTokens"]),
  },

  methods: {
    getCockLength(token) {
      if (token.length === 11) {
        return "100";
      }
      return +length * 10;
    },
  },
};
</script>
