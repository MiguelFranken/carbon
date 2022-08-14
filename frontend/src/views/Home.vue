<template>
  <HeroImage />
  <OverviewSection />
  <HowItWorksSection class="pb-20" />
  <AssignmentSection class="pb-40" />
  <TreeFooter />
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
const OverviewSection = defineAsyncComponent(() =>
  import("@/components/singles/landing/OverviewSection")
);

export default {
  name: "Home",
  components: {
    OverviewSection,
    TreeFooter,
    HowItWorksSection,
    HeroImage,
    AssignmentSection,
  },
};
</script>
