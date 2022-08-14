import http from "@/services/http";
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const state = reactive({
  tokens: null,
  page: 1,
  meta: null,
  links: null,
  isLoading: true,
  isRefreshing: false,
  filteredValues: {},
});

export default function useTokens() {
  const filteredValuesQuery = computed(() => {
    const obj = {};
    Object.keys(state.filteredValues).forEach((filterKey) => {
      if (
        state.filteredValues[filterKey] &&
        state.filteredValues[filterKey].length > 0
      ) {
        obj[filterKey] = state.filteredValues[filterKey].join(",");
      }
    });
    obj["page"] = state.page;
    return obj;
  });

  const route = useRoute();
  const router = useRouter();
  const queries = route.query;

  const groups = {};
  const filterableTraits = [];

  filterableTraits.forEach((filter) => {
    const key = filter.key;
    state.filteredValues[key] = key in queries ? queries[key].split(",") : null;
  });

  if ("page" in queries) {
    state.page = parseInt(queries["page"]);
  }

  function performFilter() {
    router
      .replace({ query: filteredValuesQuery.value })
      .then(() => loadTokens());
  }

  async function loadTokens() {
    try {
      state.isLoading = true;
      const config = {
        params: filteredValuesQuery.value,
      };

      const response = await http.get(`/token`, config);
      state.meta = response.data.meta;
      state.links = response.data.links;
      state.tokens = response.data.items;
    } catch (e) {
      console.error("Error occurred loading paginated tokens");
    } finally {
      state.isLoading = false;
    }
  }

  const hasPreviousPage = computed(() =>
    state.meta ? state.meta.currentPage > 1 : false
  );

  const hasNextPage = computed(() =>
    state.meta ? state.meta.currentPage < state.meta.totalPages : false
  );

  const currentPage = computed(() => state.meta.currentPage);

  const nextPage = computed(() =>
    hasNextPage.value ? currentPage.value + 1 : null
  );

  const previousPage = computed(() =>
    hasPreviousPage.value ? currentPage.value - 1 : null
  );

  function loadNextPage() {
    state.page++;
    router.push({ query: filteredValuesQuery.value }).then(() => loadTokens());
  }

  function loadPreviousPage() {
    state.page--;
    router.push({ query: filteredValuesQuery.value }).then(() => loadTokens());
  }

  return {
    tokensData: state,
    hasPreviousPage,
    currentPage,
    nextPage,
    loadTokens,
    loadNextPage,
    loadPreviousPage,
    previousPage,
    filteredValues: state.filteredValues,
    groups,
    performFilter,
    filterableTraits,
    hasNextPage,
  };
}
