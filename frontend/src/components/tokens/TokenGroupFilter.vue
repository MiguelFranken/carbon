<template>
  <div>
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
        v-if="isFilteringGroup"
      >
        {{ groupSelectionNumber }}
      </span>
    </button>

    <teleport to="#modals">
      <TransitionRoot :show="open" appear as="div">
        <div class="min-h-screen min-w-screen">
          <!-- Overlay -->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity z-20"
            />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed top-0 right-0 z-50 pr-16 pt-16">
              <i
                class="nes-icon times text-gray-500 hover:text-gray-400 nes-pointer hidden lg:block"
                @click="closeModal"
                style="transform: scale(2.5)"
              />
            </div>
          </TransitionChild>

          <!-- Filter Cards-->
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 overflow-x-auto z-40 flex flex-col lg:flex-row lg:items-center px-4 md:px-8 lg:px-0"
              :class="{
                'lg:justify-center': filterableGroupTraits.length < 3,
              }"
            >
              <div
                class="my-16 w-full flex justify-center items-center lg:hidden"
              >
                <i
                  class="nes-icon times text-gray-500 hover:text-gray-400 nes-pointer"
                  @click="closeModal"
                  style="transform: scale(2.5)"
                />
              </div>

              <div
                class="flex flex-col lg:flex-row space-y-8 lg:space-y-0 space-x-0 lg:space-x-8 lg:px-8"
              >
                <div
                  v-for="filter in filterableGroupTraits"
                  :key="filter.key"
                  class="last:pb-8 last:lg:pb-0"
                >
                  <div class="pixelated-container w-full">
                    <div class="pixelated-sub-container w-full">
                      <!-- Title -->
                      <div
                        class="flex flex-col md:flex-row justify-center items-start text-3xl leading-6 font-bold text-gray-900 space-y-6 md:space-y-0 md:space-x-4"
                      >
                        <div class="flex-grow">
                          <div class="leading-8 block">
                            {{ filter.placeholder }}
                          </div>
                          <div
                            class="block text-sm leading-5 font-medium text-gray-500 mt-2 hidden md:block"
                          >
                            {{ filter.description }}
                          </div>
                        </div>
                        <div class="flex-shrink-0 flex justify-center">
                          <button
                            type="button"
                            class="text-sm font-medium nes-btn"
                            @click="reset(filter.key)"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      <!-- Multi Select Buttons -->
                      <TraitFilterMultiSelection
                        v-model="filteredValues[filter.key]"
                        :placeholder="filter.placeholder"
                        :options="filter.options"
                      />

                      <div class="flex-shrink-0 flex justify-center">
                        <button
                          type="button"
                          class="text-sm font-medium nes-btn cock-button mt-5"
                          @click="closeModal"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </TransitionRoot>
    </teleport>
  </div>
</template>

<script>
import useTokens from "@/modules/tokens";
import { computed, toRefs } from "vue";
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import { FilterIcon } from "@heroicons/vue/solid";
import TraitFilterMultiSelection from "@/components/tokens/TraitFilterMultiSelection";

export default {
  name: "TokenGroupFilter",

  components: {
    TraitFilterMultiSelection,
    TransitionRoot,
    TransitionChild,
    FilterIcon,
  },

  data() {
    return {
      open: false,
    };
  },

  methods: {
    closeModal() {
      this.performFilter();
      this.open = false;
    },
    openModal() {
      this.open = true;
    },
  },

  props: ["group"],

  setup(props) {
    const { group } = toRefs(props);
    const {
      filterableTraits,
      filteredValues,
      performFilter,
      groups,
    } = useTokens();

    const filterableGroupTraits = filterableTraits.filter(
      (filter) => filter.group === group.value
    );

    const groupSelectionNumber = computed(() => {
      let count = 0;
      filterableGroupTraits.forEach((filter) => {
        if (filteredValues[filter.key]) {
          count += filteredValues[filter.key].length;
        }
      });
      return count;
    });

    const isFilteringGroup = computed(() => {
      return groupSelectionNumber.value > 0;
    });

    return {
      filterableGroupTraits,
      performFilter,
      filteredValues,
      placeholder: computed(() => groups[group.value].placeholder),
      isFilteringGroup,
      groupSelectionNumber,
      reset(filterKey) {
        filteredValues[filterKey] = [];
      },
    };
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .pixelated-sub-container {
    width: 40vw;
  }
}
</style>
