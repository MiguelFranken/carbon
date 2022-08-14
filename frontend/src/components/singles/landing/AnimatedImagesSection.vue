<template>
  <div class="lg:mb-16 relative">
    <AnimatedBackground />
    <CryptoContainer class="relative">
      <BestFlexSectionAnimatedImages class="py-16" />
    </CryptoContainer>
  </div>
</template>

<script>
import CryptoContainer from "@/components/globals/CryptoContainer";
import BestFlexSectionAnimatedImages from "@/components/singles/landing/best-flex-section/BestFlexSectionAnimatedImages";
import AnimatedBackground from "@/components/singles/landing/AnimatedBackground";

export default {
  name: "AnimatedImagesSection",

  components: {
    AnimatedBackground,
    BestFlexSectionAnimatedImages,
    CryptoContainer,
  },
};
</script>
