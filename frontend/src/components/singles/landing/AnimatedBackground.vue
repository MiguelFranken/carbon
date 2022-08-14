<template>
  <div
    class="absolute inset-0 inline-flex flex-wrap overflow-hidden content-start"
  >
    <div
      class="pixel"
      v-for="i in 400"
      :key="i"
      :ref="setItemRef"
      :style="{
        animationDelay: Math.ceil(Math.random() * 5000) + 'ms',
      }"
    />
  </div>
</template>

<script>
export default {
  name: "AnimatedBackground",

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
