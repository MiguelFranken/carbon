<template>
  <div>
    <div class="hidden md:block pb-4">
      <h2
        class="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
        style="color: #701fe8"
      >
        FILTER
      </h2>
      <div class="text-gray-300 pt-4">
        <div>
          Filter the DiamondGallery to find your absolute favorite diamond.
        </div>
      </div>
    </div>
    <div class="md:hidden">
      <Disclosure>
        <DisclosureButton>
          <button
            class="text-sm font-medium nes-btn crypto-button-border-gray nes-pointer my-4"
          >
            Filter
          </button>
        </DisclosureButton>
        <DisclosurePanel class="text-gray-500">
          <div class="flex flex-wrap mb-8">
            <template v-for="group in groups" :key="'group_' + group">
              <TokenGroupFilter class="mr-3 mb-3" :group="group" />
            </template>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <div class="hidden md:flex flex-wrap mb-8">
      <template v-for="group in groups" :key="'group_' + group">
        <TokenGroupFilter class="mr-3 mb-3" :group="group" />
      </template>
    </div>
  </div>
</template>

<script>
import useTokens from "@/modules/tokens";
import TokenGroupFilter from "@/components/tokens/TokenGroupFilter";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

export default {
  components: {
    TokenGroupFilter,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  setup() {
    const { filterableTraits, filteredValues, performFilter } = useTokens();

    const update = (filterKey, filterValue) => {
      filteredValues[filterKey] = filterValue;
      performFilter(filterKey, filterValue);
    };

    const groups = ["length", "top"];

    return {
      filterableTraits,
      filteredValues,
      update,
      groups,
    };
  },
};
</script>
