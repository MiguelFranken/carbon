<template>
  <nav
    class="px-4 flex items-center justify-between sm:px-0"
    v-if="hasPreviousPage || hasNextPage"
  >
    <div class="-mt-px w-0 flex-1 flex">
      <button
        v-show="hasPreviousPage"
        class="pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none nes-pointer"
        @click="loadPreviousPage"
      >
        <ArrowNarrowLeftIcon class="mr-3 h-5 w-5" aria-hidden="true" />
        Previous
      </button>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <button
        v-show="hasNextPage"
        class="pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none nes-pointer"
        @click="loadNextPage"
      >
        Next
        <ArrowNarrowRightIcon class="ml-3 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script>
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";
import useTokens from "@/modules/tokens";

export default {
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
  },

  setup() {
    const {
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
      loadNextPage,
      loadPreviousPage,
    } = useTokens();

    return {
      hasPreviousPage,
      loadNextPage,
      loadPreviousPage,
      hasNextPage,
      nextPage,
      previousPage,
    };
  },
};
</script>
