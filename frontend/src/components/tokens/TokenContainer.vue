<template>
  <div>
    <TokenGrid class="pt-4" @token::click="$emit('token::click', $event)" />
    <TokensPaginationBar />
  </div>
</template>

<script>
import TokenGrid from "@/components/tokens/TokenGrid";
import TokensPaginationBar from "@/components/tokens/TokensPaginationBar";

export default {
  components: {
    TokensPaginationBar,
    TokenGrid,
  },

  emits: ["token::click"],
};
</script>
