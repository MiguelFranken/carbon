<template>
  <transition name="slide-fade" appear :style="delayStyle">
    <slot />
  </transition>
</template>

<script>
export default {
  props: ["delay"],

  computed: {
    delayStyle() {
      if (this.delay) {
        return `transition-delay: ${this.delay}s`;
      }
      return undefined;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
