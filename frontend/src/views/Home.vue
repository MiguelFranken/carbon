<template>
  <HeroImage />
  <Transition appear name="fade">
    <OverviewSection ref="target1" />
  </Transition>
  <CockGallery v-if="targetIsVisible1" ref="target2" />
  <Transition appear name="fade">
    <HowItWorksSection class="pb-20" v-if="targetIsVisible2" ref="target3" />
  </Transition>
  <Transition appear name="fade">
    <AssignmentSection class="pb-40" v-if="targetIsVisible3" ref="target4" />
  </Transition>
  <Transition appear name="fade">
    <AnimatedImagesSection v-if="targetIsVisible4" ref="target5" />
  </Transition>
  <Transition appear name="fade">
    <EndSection class="pb-20" v-if="targetIsVisible5" ref="target6" />
  </Transition>
  <Transition appear name="fade">
    <TreeFooter v-if="targetIsVisible6" ref="target7" />
  </Transition>
</template>

<script>
import { defineAsyncComponent } from "vue";

const HeroImage = defineAsyncComponent(() =>
  import("@/components/singles/landing/HeroImage")
);

const HowItWorksSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/HowItWorksSection")
);
const AssignmentSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/assignment-section/AssignmentSection")
);
const TreeFooter = defineAsyncComponent(() =>
  import("@/components/singles/landing/TreeFooter")
);
const AnimatedImagesSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/AnimatedImagesSection")
);
const EndSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/EndSection")
);
const CockGallery = defineAsyncComponent(() =>
  import("@/components/singles/landing/CockGallery")
);
const OverviewSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/OverviewSection")
);

import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  name: "Home",
  components: {
    // AppearTransition,
    OverviewSection,
    EndSection,
    CockGallery,
    AnimatedImagesSection,
    TreeFooter,
    HowItWorksSection,
    HeroImage,
    AssignmentSection,
  },

  setup() {
    const target1 = ref(null);
    const target2 = ref(null);
    const target3 = ref(null);
    const target4 = ref(null);
    const target5 = ref(null);
    const target6 = ref(null);
    const target7 = ref(null);
    const targetIsVisible1 = ref(false);
    const targetIsVisible2 = ref(false);
    const targetIsVisible3 = ref(false);
    const targetIsVisible4 = ref(false);
    const targetIsVisible5 = ref(false);
    const targetIsVisible6 = ref(false);
    const targetIsVisible7 = ref(false);
    const options = { threshold: 0.75, rootMargin: "40px" };

    useIntersectionObserver(
      target1,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible1.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target2,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible2.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target3,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible3.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target4,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible4.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target5,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible5.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target6,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible6.value = isIntersecting;
        }
      },
      options
    );

    useIntersectionObserver(
      target7,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          targetIsVisible7.value = isIntersecting;
        }
      },
      options
    );

    return {
      target1,
      target2,
      target3,
      target4,
      target5,
      target6,
      target7,
      targetIsVisible1,
      targetIsVisible2,
      targetIsVisible3,
      targetIsVisible4,
      targetIsVisible5,
      targetIsVisible6,
    };
  },
};
</script>

<style lang="scss">
.fade-enter-active {
  transition: opacity 0.8s ease;
  @apply translate-y-0 transition-all duration-500 transform-gpu;
}

.fade-enter-from {
  opacity: 0;
  @apply translate-y-6 transition-all duration-500 transform-gpu;
}
</style>
