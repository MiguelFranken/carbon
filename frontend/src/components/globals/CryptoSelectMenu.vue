<template>
  <Listbox as="div" v-if="selected" v-model="selected">
    <div class="relative">
      <div class="inline-flex">
        <ListboxButton
          class="relative z-0 inline-flex border-4 border border-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:border-blueish nes-pointer"
        >
          <div
            class="relative inline-flex items-center py-2 pl-4 rounded-l-md text-gray-500"
          >
            <!-- <CheckIcon class="h-5 w-5" aria-hidden="true" />-->
            <p class="text-sm font-medium pixelated">
              {{ selected.title }}
            </p>
          </div>
          <div
            class="relative inline-flex items-center p-2 rounded-l-none rounded-r-md text-sm font-medium text-gray-800 focus:outline-none focus:z-10"
          >
            <div class="pt-1 -mb-1.5">
              <i class="nes-icon caret-down is-small" />
            </div>
          </div>
        </ListboxButton>
      </div>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="origin-top-right absolute z-10 border-4 border-gray-800 right-0 mt-1 w-72 shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.title"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              class="nes-pointer pixelated text-xs"
              :class="[
                active ? 'bg-blueish' : 'text-gray-900',
                'select-none relative p-4',
              ]"
            >
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <p :class="selected ? 'font-semibold' : 'font-normal'">
                    {{ option.title }}
                  </p>
                  <span
                    v-if="selected"
                    :class="active ? 'text-white' : 'text-blue-500'"
                  >
                    <i class="nes-icon check is-small" />
                  </span>
                </div>
                <p :class="[active ? 'text-gray-50' : 'text-gray-500', 'mt-2']">
                  {{ option.description }}
                </p>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { watch, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  },

  props: ["modelValue", "options"],

  setup(props, { emit }) {
    const selected = ref(props.options[0]);

    watch(
      selected,
      (selected) => {
        emit("update:modelValue", selected);
      },
      {
        immediate: true,
      }
    );

    return {
      selected,
    };
  },
};
</script>
