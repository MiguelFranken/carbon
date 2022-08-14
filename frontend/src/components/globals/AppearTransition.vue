<template>
  <div>
    <transition
      appear
      enter-class="opacity-0 translate-y-6"
      enter-active-class="transition-all duration-500 transform-gpu"
      enter-to-class="opacity-100 translate-y-0"
    >
      <slot></slot>
    </transition>
  </div>
</template>
