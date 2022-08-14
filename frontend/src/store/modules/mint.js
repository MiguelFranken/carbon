import CryptoCocks from "../../contracts/abi/CryptoCocks.json";
import addresses from "../../contracts/addresses.json";

const state = {
  cryptoCocksContract: null,
};

const getters = {
  getCryptoCocksContract(state) {
    return state.cryptoCocksContract;
  },
};

const actions = {
  async fetchCryptoCocksContract({ rootState, commit }) {
    const web3 = rootState.accounts.web3;
    const cryptoCocksContractAddress = addresses.CryptoCocks;
    const contract = new web3.eth.Contract(
      CryptoCocks.abi,
      cryptoCocksContractAddress
    );
    await commit("setCryptoCocksContract", contract);
    return contract;
  },

  async mint({ state, dispatch, rootGetters }) {
    let contract = state.cryptoCocksContract;
    if (!contract) {
      contract = await dispatch("fetchCryptoCocksContract");
    }

    const account = rootGetters["accounts/getActiveAccount"];
    const accountBalanceWei = rootGetters["accounts/getActiveBalanceWei"];
    const minWei = 20000000000000000; // 0.02 ETH
    const onePercentWei = Math.max(accountBalanceWei * 0.01, minWei);

    const freeMinting = false;
    const value = freeMinting ? 0 : onePercentWei;
    console.log(`Minting token for account ${account} with value ${value}`);

    let estimated;
    try {
      const estimatedUnscaled = await contract.methods.mint().estimateGas({
        from: account,
        value: value.toString(),
      });
      estimated = Math.round(estimatedUnscaled * 1.6).toString();
      console.log(`Estimated gas limit is ${estimatedUnscaled}`);
    } catch (e) {
      estimated = "600000";
      console.error("Cannot estimate gas limit for mint transaction", e);
    }

    const listener = contract.methods.mint().send({
      from: account,
      value: value.toString(),
      gasLimit: estimated,
    });

    const confirmation = new Promise((resolve, reject) => {
      listener
        .on("transactionHash", (hash) => {
          resolve(hash);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
    const receipt = new Promise((resolve, reject) => {
      listener
        .on("receipt", (receipt) => {
          resolve(receipt);
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    return {
      confirmation,
      receipt,
    };
  },
};

const mutations = {
  setCryptoCocksContract(state, _contract) {
    console.log("setCryptoCocksContract", _contract);
    state.cryptoCocksContract = _contract;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
