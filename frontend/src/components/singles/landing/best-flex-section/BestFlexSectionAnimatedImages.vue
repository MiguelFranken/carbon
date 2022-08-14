<template>
  <div class="flex w-full flex-wrap">
    <div class="gif-container">
      <div id="growth" class="gif" />
    </div>
    <div class="icon-container">
      <i class="nes-icon caret-right caret" />
    </div>
    <div class="gif-container">
      <div id="stonks" class="gif" />
    </div>
    <div class="icon-container">
      <i class="nes-icon caret-right caret" />
    </div>
    <div class="gif-container">
      <div id="lambo" class="gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BestFlexSectionAnimatedImages",
};
</script>

<style lang="scss" scoped>
.gap-icon {
  @apply flex-shrink-0 h-36 w-36 lg:h-12 lg:w-12 text-blueish mx-4;
}

.icon-container {
  @apply flex-shrink-0 flex items-center w-full lg:w-max justify-center rotate-90 lg:rotate-0 px-4;
}

.gif {
  @apply w-full rounded-md;
  padding-top: 50%; // 2:1 Aspect Ratio
}

#growth {
  background: url("/landing/best-flex-section/growth.gif");
  background-size: 100%;
}

#stonks {
  background: url("/landing/best-flex-section/stonks.gif");
  background-size: 100%;
}

#lambo {
  background: url("/landing/best-flex-section/lambo.gif");
  background-size: 100%;
}

.gif-container {
  @apply flex-grow w-full lg:w-max;
}

.caret {
  @apply text-blueish;

  transform: scale(3);
  margin: 0 2rem;
}

@media (max-width: 768px) {
  .caret {
    margin: 2rem 0;
  }
}
</style>
