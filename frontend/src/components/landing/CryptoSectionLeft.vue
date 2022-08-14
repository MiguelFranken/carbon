<template>
  <div class="overflow-hidden pixelated pr-5">
    <!--      px-4 sm:px-6 lg:px-8-->
    <div class="relative max-w-xl mx-auto lg:max-w-7xl">
      <div class="relative">
        <h2
          class="text-left text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl uppercase"
          style="color: #701fe8"
        >
          {{ title }}
        </h2>
        <div
          class="text-left text-sm leading-0 lg:leading-8 uppercase highlighted"
        >
          {{ subtitle }}
        </div>
        <p
          class="mt-4 max-w-4xl mx-auto text-left leading-7 text-lg lg:text-xl text-gray-300"
        >
          <span class="content"><slot /></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CryptoSectionLeft",
  props: ["title", "subtitle"],
};
</script>

<style>
.content > p {
  @apply mt-4 first:mt-0;
}
</style>
