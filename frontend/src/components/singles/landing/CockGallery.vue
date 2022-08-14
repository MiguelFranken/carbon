<template>
  <div class="relative mt-24">
    <div
      class="absolute inset-0 inline-flex flex-wrap overflow-hidden content-start"
    >
      <div
        class="pixel"
        v-for="i in numberTiles"
        :key="i"
        :ref="setItemRef"
        :style="{
          animationDelay: Math.ceil(Math.random() * 5000) + 'ms',
        }"
      />
    </div>
    <div
      class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-y-12 lg:px-12 py-16 relative"
    >
      <div class="flex justify-center" v-for="src in cocksForScreen" :key="src">
        <img
          :src="'/landing/cock-gallery/' + src"
          class="w-40 lg:w-32 rounded-md"
          alt="Gallery"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useBreakpoint from "@/modules/useBreakpoints";
import { computed } from "vue";

export default {
  name: "CockGallery",

  data() {
    return {
      itemRefs: [],
    };
  },

  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
  },

  beforeUpdate() {
    this.itemRefs = [];
  },

  setup() {
    const { breakpoints } = useBreakpoint();

    const cocks = [
      "1.svg",
      "2.svg",
      "3.svg",
      "4.svg",
      "5.svg",
      "6.svg",
      "7.svg",
      "8.svg",
      "9.svg",
      "10.svg",
      "11.svg",
      "12.svg",
      "13.svg",
      "14.svg",
      "15.svg",
      "16.svg",
      "17.svg",
      "18.svg",
      "19.svg",
      "20.svg",
      "21.svg",
      "22.svg",
      "23.svg",
      "24.svg",
    ];

    const cocksForScreen = computed(() => {
      console.log("breakpoint", breakpoints.is);
      if (breakpoints.is === "xs" || breakpoints.is === "md") {
        return cocks.slice(0, 12);
      } else if (breakpoints.is === "lg") {
        return cocks.slice(0, 20);
      } else {
        return cocks;
      }
    });

    const numberTiles = computed(() => {
      if (breakpoints.is === "xs" || breakpoints.is === "md") {
        return 200;
      } else if (breakpoints.is === "lg") {
        return 500;
      } else {
        return 500;
      }
    });

    return {
      breakpoint: breakpoints.is,
      cocksForScreen,
      numberTiles,
    };
  },
};
</script>

<style scoped>
.pixel {
  background: #701fe8;
  width: 12.5vw;
  height: 12.5vw;
  opacity: 0;
  animation: blink 5s infinite;
}

@media (min-width: 768px) {
  .pixel {
    width: 10vw;
    height: 10vw;
  }
}

@media (min-width: 1024px) {
  .pixel {
    width: 5vw;
    height: 5vw;
  }
}

@media (min-width: 1280px) {
  .pixel {
    width: 2.5vw;
    height: 2.5vw;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0;
  }
}
</style>
