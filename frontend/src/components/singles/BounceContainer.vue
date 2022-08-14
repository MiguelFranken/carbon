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
        return `animation-delay: ${this.delay}s; transition-delay: ${this.delay}s`;
      }
      return undefined;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  animation: bounce-in 0.7s ease-out;
  transition: all 0.7s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.4, 0.4);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
