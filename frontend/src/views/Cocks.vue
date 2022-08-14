<template>
  <div>
    <div v-if="isUserConnected && !transfersData.isLoading">
      <OwnToken />
    </div>
    <TokenContainer class="z-30" @token::click="onTokenClick" />
    <teleport to="body">
      <TokenModal
        :token="selectedToken"
        class="z-50"
        :open="open"
        @modal::close="open = false"
      />
    </teleport>
  </div>
</template>

<script>
import useTokens from "@/modules/tokens";
import TokenContainer from "@/components/tokens/TokenContainer";
import TokenModal from "@/components/tokens/TokenModal";
import OwnToken from "@/components/tokens/OwnToken";
import useTransfers from "@/modules/transfers";
import { mapGetters } from "vuex";

export default {
  components: { OwnToken, TokenModal, TokenContainer },

  data() {
    return {
      open: false,
      selectedToken: null,
    };
  },

  computed: {
    ...mapGetters("accounts", ["isUserConnected"]),
  },

  methods: {
    onTokenClick(token) {
      this.selectedToken = token;
      this.open = true;
    },
  },

  setup() {
    const { tokensData, loadTokens } = useTokens();
    const { transfersData } = useTransfers();

    loadTokens();

    return {
      tokensData,
      transfersData,
    };
  },
};
</script>
