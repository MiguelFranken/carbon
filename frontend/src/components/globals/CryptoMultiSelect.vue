<template>
  <div class="mr-4 mb-4">
    <button
      class="text-sm font-medium nes-btn crypto-button-border-gray nes-pointer group flex space-x-2 items-center"
      @click="openModal"
      :class="{
        'cock-button crypto-button-border-blue': open,
      }"
    >
      <span class="block truncate">{{ placeholder }}</span>
      <span class="flex items-center justify-center pointer-events-none">
        <FilterIcon
          class="w-4 h-4 fill-current text-grey-600"
          aria-hidden="true"
        />
      </span>
      <span
        class="flex text-white justify-center items-center absolute p-1 h-6 w-6 -right-3 -top-3 bg-blueish-light text-xs rounded-full group-focus:bg-blueish z-50"
        :class="{
          '!bg-blueish': open,
        }"
        v-if="modelValue && modelValue.length > 0"
      >
        {{ modelValue.length }}
      </span>
    </button>
  </div>

  <teleport to="body">
    <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" :open="open" @close="closeModal">
        <div class="fixed inset-0 z-40 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay
                class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity"
              />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div class="pixelated-container">
                <div
                  class="inline-block w-full max-w-3xl p-6 text-left align-middle transition-all filter-modal"
                >
                  <DialogTitle as="div">
                    <div
                      class="flex justify-center items-start text-3xl leading-6 font-bold text-gray-900"
                    >
                      <div class="flex-grow">
                        <div class="leading-8 block">
                          Filter {{ placeholder }}
                        </div>
                        <div
                          class="block text-sm leading-5 font-medium text-gray-500 mt-2"
                        >
                          Here could be a short description of the trait to
                          which the filter should be applied
                        </div>
                      </div>
                      <div class="flex-shrink-0 flex justify-center">
                        <button
                          type="button"
                          class="text-sm font-medium nes-btn cock-button"
                          @click="reset"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </DialogTitle>
                  <div class="mt-8">
                    <div>
                      <div class="relative grid gap-2 lg:grid-cols-3">
                        <button
                          v-for="option in options"
                          :key="option.id"
                          class="nes-btn pixelated relative flex items-center p-4 focus:outline-none nes-pointer whitespace-nowrap font-medium"
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
                            v-if="
                              modelValue && modelValue.includes(option.value)
                            "
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
                  <div class="absolute right-0 -top-10">
                    <button
                      class="nes-icon times text-gray-500 hover:text-gray-400 nes-pointer focus:outline-none"
                      style="transform: scale(1.8)"
                      @click="closeModal"
                    />
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { FilterIcon } from "@heroicons/vue/solid";

export default {
  name: "CryptoMultiSelect",

  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    FilterIcon,
  },

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

    reset() {
      this.$emit("update:modelValue", []);
    },
  },

  setup() {
    const open = ref(false);

    return {
      open,
      closeModal() {
        open.value = false;
      },
      openModal() {
        open.value = true;
      },
    };
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
