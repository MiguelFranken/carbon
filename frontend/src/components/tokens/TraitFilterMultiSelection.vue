<template>
  <div class="mt-8">
    <div>
      <div class="relative grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="option in options"
          :key="option.id"
          class="nes-btn pixelated relative flex items-center p-2 focus:outline-none nes-pointer whitespace-nowrap font-medium"
          :class="{
            'cock-button hover:!bg-opacity-80':
              modelValue && modelValue.includes(option.value),
          }"
          @click="selectOption(option.value)"
        >
          <span class="block truncate">
            {{ option.label }}
          </span>

          <span
            v-if="modelValue && modelValue.includes(option.value)"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-white"
          >
            <i
              class="nes-icon check text-gray-300"
              style="transform: scale(1.3)"
            />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TraitFilterMultiSelection",

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Filter",
    },
  },

  emits: ["update:modelValue"],

  methods: {
    selectOption(value) {
      if (value === "") {
        this.$emit("update:modelValue", []);
        return;
      }
      let selectedValues = this.modelValue ? [...this.modelValue] : [];
      const index = selectedValues.findIndex((v) => v === value);
      if (index === -1) {
        selectedValues.push(value);
      } else {
        selectedValues.splice(index, 1);
      }
      this.$emit("update:modelValue", selectedValues);
    },
  },
};
</script>

<style>
.select-container {
  @apply relative py-1.5 pl-2 pr-8 text-sm text-left leading-5 border-4 bg-white hover:bg-gray-50 focus:outline-none focus:border-blueish border-blueish-light;
}

.filter-modal {
  @apply bg-gray-300;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%239C92AC' fill-opacity='0.18' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
