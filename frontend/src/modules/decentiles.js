import http from "@/services/http";
import { computed, reactive } from "vue";

const state = reactive({
  isLoading: true,
  counts: null,
});

export default function useDecentiles() {
  async function getDecentiles() {
    try {
      state.isLoading = true;
      let response;
      try {
        response = await http.get(`/token/decentiles`);
      } catch (e) {
        state.isLoading = false;
        return null;
      }
      state.isLoading = false;
      return response.data;
    } catch (error) {
      console.error("Could not load decentiles", error);
    }
  }

  async function fetchCountPerSize() {
    try {
      const response = await http.get(`/token/counts`);
      state.counts = response.data;
    } catch (error) {
      console.error("Could not load decentiles", error);
    }
  }

  return {
    getDecentiles,
    fetchCountPerSize,
    isLoading: computed(() => state.isLoading),
    counts: computed(() => state.counts),
  };
}
