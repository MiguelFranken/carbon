<template>
  <picture class="contents">
    <source :srcset="`${src}.webp`" type="image/webp" />
    <img
      :src="src"
      :alt="`Carbon | ${alt}`"
      :class="imgClass"
      :style="imgStyle"
      :loading="imgLoading"
    />
  </picture>
</template>
<script>
export default {
  name: "CryptoImage",

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
    },
    imgClass: {
      type: String,
      required: false,
    },
    imgStyle: {
      type: String,
      required: false,
    },
    imgLoading: {
      type: String,
      default: "lazy",
    },
  },
};
</script>
