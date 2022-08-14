import http from "@/services/http";
import { reactive } from "vue";

const state = reactive({
  transfers: null,
  isLoading: true,
});

export default function useTransfers() {
  async function loadTransfers(owner) {
    try {
      state.isLoading = true;
      const response = await http.get("/transfer", {
        params: {
          address: owner,
        },
      });
      state.transfers = response.data;
    } finally {
      state.isLoading = false;
    }
  }

  return {
    transfersData: state,
    loadTransfers,
  };
}
