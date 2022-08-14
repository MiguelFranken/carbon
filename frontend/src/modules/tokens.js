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

  const groups = {
    colors: {
      placeholder: "Colors",
    },
    condom: {
      placeholder: "Condom",
    },
    length: {
      placeholder: "Length",
    },
    glans: {
      placeholder: "Glans",
    },
    pubic_hair: {
      placeholder: "Pubic Hair",
    },
    ballsack: {
      placeholder: "Ballsack",
    },
    jizz: {
      placeholder: "Jizz",
    },
    specials: {
      placeholder: "Specials",
    },
    vein: {
      placeholder: "Vein",
    },
    penis_ring: {
      placeholder: "Penis Ring",
    },
    top: {
      placeholder: "All Time High",
    },
  };

  const filterableTraits = [
    {
      key: "background",
      group: "colors",
      placeholder: "Background",
      description: "Filter by background color",
      options: [
        {
          value: "black",
          label: "Black",
        },
        {
          value: "blue",
          label: "Blue",
        },
        {
          value: "yellow",
          label: "Yellow",
        },
        {
          value: "green",
          label: "Green",
        },
        {
          value: "purple",
          label: "Purple",
        },
        {
          value: "orange",
          label: "Orange",
        },
        {
          value: "pink",
          label: "Pink",
        },
      ],
    },
    {
      key: "color",
      group: "colors",
      placeholder: "Color",
      description: "Filter by cock color",
      options: [
        {
          value: "blue",
          label: "Blue",
        },
        {
          value: "yellow",
          label: "Yellow",
        },
        {
          value: "green",
          label: "Green",
        },
        {
          value: "purple",
          label: "Purple",
        },
        {
          value: "orange",
          label: "Orange",
        },
        {
          value: "pink",
          label: "Pink",
        },
        {
          value: "bone",
          label: "Bone",
        },
        {
          value: "wood",
          label: "Wood",
        },
      ],
    },
    {
      key: "length",
      group: "length",
      placeholder: "Length",
      description:
        "Filter by length, which depends on the wallet balance at the time minting a cock",
      options: [
        {
          value: "1",
          label: "10%",
        },
        {
          value: "2",
          label: "20%",
        },
        {
          value: "3",
          label: "30%",
        },
        {
          value: "4",
          label: "40%",
        },
        {
          value: "5",
          label: "50%",
        },
        {
          value: "6",
          label: "60%",
        },
        {
          value: "7",
          label: "70%",
        },
        {
          value: "8",
          label: "80%",
        },
        {
          value: "9",
          label: "90%",
        },
        {
          value: "10",
          label: "100%",
        },
      ],
    },
    {
      key: "vein",
      group: "vein",
      placeholder: "Vein",
      description: "Filter by the veins on the cock",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "normal",
          label: "Normal",
        },
        {
          value: "crazy",
          label: "Crazy",
        },
      ],
    },
    {
      key: "top",
      group: "top",
      placeholder: "All Time High",
      description: "Filter by all time high cocks",
      options: [
        {
          value: "true",
          label: "All Time High",
        },
      ],
    },
    {
      key: "pubic_hair",
      group: "pubic_hair",
      placeholder: "Pubic Hair",
      description: "Filter by pubic hair around the cock",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "normal",
          label: "Normal",
        },
        {
          value: "not-shaved",
          label: "Not Shaved",
        },
        {
          value: "never-shaved",
          label: "Never Shaved",
        },
      ],
    },
    {
      key: "condom",
      group: "condom",
      placeholder: "Condom",
      description: "Filter by condoms around your cock",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "normal",
          label: "Normal",
        },
        {
          value: "jizzed",
          label: "Jizzed",
        },
      ],
    },
    {
      key: "condom_color",
      group: "condom",
      placeholder: "Condom Color",
      description: "Filter by condom color",
      options: [
        {
          value: "red",
          label: "Red",
        },
        {
          value: "blue",
          label: "Blue",
        },
        {
          value: "yellow",
          label: "Yellow",
        },
      ],
    },
    {
      key: "glans_piercing",
      group: "glans",
      placeholder: "Glans Piercing",
      description: "Filter by piercings on your cock",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "normal",
          label: "Normal",
        },
        {
          value: "ring",
          label: "Ring",
        },
        {
          value: "septum",
          label: "Septum",
        },
      ],
    },
    {
      key: "glans_piercing_color",
      group: "glans",
      placeholder: "Glans Piercing Color",
      description: "Filter by piercing colors on your cock",
      options: [
        {
          value: "silver",
          label: "Silver",
        },
        {
          value: "gold",
          label: "Gold",
        },
      ],
    },
    {
      key: "silver_penis_ring",
      group: "penis_ring",
      placeholder: "Silver Penis Ring",
      description: "Filter by silver penis rings",
      options: [
        {
          value: 0,
          label: 0,
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ],
    },
    {
      key: "golden_penis_ring",
      group: "penis_ring",
      placeholder: "Golden Penis Ring",
      description: "Filter by golden penis rings",
      options: [
        {
          value: 0,
          label: 0,
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ],
    },
    {
      key: "mini_silver_penis_ring",
      group: "penis_ring",
      placeholder: "Mini Silver Penis Ring",
      description: "Filter by mini silver penis rings",
      options: [
        {
          value: 0,
          label: 0,
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ],
    },
    {
      key: "mini_golden_penis_ring",
      group: "penis_ring",
      placeholder: "Mini Golden Penis Ring",
      description: "Filter by mini golden penis rings",
      options: [
        {
          value: 0,
          label: 0,
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ],
    },
    {
      key: "ballsack_sleeve",
      group: "ballsack",
      placeholder: "Ballsack Sleeve",
      description: "Filter by ballsack sleeves",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "gray",
          label: "Gray",
        },
      ],
    },
    {
      key: "glans_hat",
      group: "glans",
      placeholder: "Glans Hat",
      description: "Filter by glans hat",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "holy",
          label: "Holy",
        },
        {
          value: "crown",
          label: "Crown",
        },
      ],
    },
    {
      key: "jizz",
      group: "jizz",
      placeholder: "Jizz",
      description: "Filter by jizz",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "first-timer",
          label: "First Timer",
        },
        {
          value: "shot-in-the-sock",
          label: "Shot In The Sock",
        },
        {
          value: "twist-jizz",
          label: "The Ol'Granny Twist Jizz",
        },
      ],
    },
    {
      key: "aura",
      group: "specials",
      placeholder: "Aura",
      description: "Filter by aura",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "fire",
          label: "Fire",
        },
        {
          value: "blessing",
          label: "Blessing",
        },
        {
          value: "slime",
          label: "Slime",
        },
      ],
    },
    {
      key: "laser_beam",
      group: "specials",
      placeholder: "Laser Beam",
      description: "Filter by laser beam",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "red",
          label: "Red",
        },
        {
          value: "green",
          label: "Green",
        },
      ],
    },
    {
      key: "ballsack_ring",
      group: "ballsack",
      placeholder: "Ballsack Ring",
      description: "Filter by ballsack ring",
      options: [
        {
          value: "none",
          label: "None",
        },
        {
          value: "silver",
          label: "Silver",
        },
        {
          value: "gold",
          label: "Gold",
        },
      ],
    },
  ];

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
