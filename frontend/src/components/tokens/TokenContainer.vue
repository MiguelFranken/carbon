<template>
  <div>
    <TokensActionBar />
    <TokenGrid class="pt-4" @token::click="$emit('token::click', $event)" />
    <TokensPaginationBar />
  </div>
</template>

<script>
import TokenGrid from "@/components/tokens/TokenGrid";
import TokensPaginationBar from "@/components/tokens/TokensPaginationBar";
import TokensActionBar from "@/components/tokens/TokensActionBar";

export default {
  components: {
    TokensActionBar,
    TokensPaginationBar,
    TokenGrid,
  },

  emits: ["token::click"],
};
</script>
