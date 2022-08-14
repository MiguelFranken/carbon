//import { createLogger, createStore } from "vuex";
import { createStore } from "vuex";
import accounts from "@/store/modules/accounts";
import mint from "@/store/modules/mint";

export default createStore({
  modules: {
    accounts,
    mint,
  },
  //plugins: [createLogger()],
});
