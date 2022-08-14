import http from "@/services/http";
import { reactive } from "vue";

const state = reactive({
  traits: null,
  isLoading: true,
});

export default function useTraits() {
  async function loadTraitsForTokenId(id) {
    try {
      state.isLoading = true;
      const response = await http.get(`/traits/token/${id}`);
      console.log("traits", response);
      state.traits = response.data;
    } finally {
      state.isLoading = false;
    }
  }

  return {
    traitsData: state,
    loadTraitsForTokenId,
  };
}
