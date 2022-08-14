<template>
  <div class="nes-container is-rounded bg-gray-300 pixelated cc-container">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Account Details
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        {{ $route.params.address }}
      </p>
      <div>
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div class="text-sm font-medium text-gray-500">Etherscan</div>
          <div
            class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 underline text-blue-600 truncate"
          >
            <a :href="etherscanHref">{{ $route.params.address }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chain from "../contracts/chain.json";

export default {
  computed: {
    etherscanHref() {
      if (chain.id === 3) {
        return `https://ropsten.etherscan.io/address/${this.$route.params.address}`;
      } else if (chain.id === 1) {
        return `https://etherscan.io/address/${this.$route.params.address}`;
      } else if (chain.id === 4) {
        return `https://rinkeby.etherscan.io/address/${this.$route.params.address}`;
      } else {
        return "#";
      }
    },
  },
};
</script>
