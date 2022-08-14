import Web3Modal from "web3modal";
import Web3 from "web3";
import useTransfers from "@/modules/transfers";

const state = () => ({
  activeAccount: null,
  activeBalance: 0,
  chainId: null,
  chainName: null,
  web3: null,
  isConnected: false,
  providerW3m: null, // "provider" from Web3Modal
  web3Modal: null,
  isWhitelisted: false,
  isCheckingWhitelisting: true,
  tokens: [],
});

const getters = {
  getTokens(state) {
    return state.tokens;
  },

  getActiveAccount(state) {
    if (!state.activeAccount) {
      return window.ethereum.selectedAddress;
    }

    return state.activeAccount;
  },
  isWhitelisted(state) {
    return state.isWhitelisted;
  },
  isCheckingWhitelisting(state) {
    return state.isCheckingWhitelisting;
  },
  getActiveBalanceWei(state) {
    return state.activeBalance;
  },
  getActiveBalanceEth(state, getters) {
    return getters.getWeb3.utils.fromWei(state.activeBalance, "ether");
  },
  getChainId(state) {
    return state.chainId;
  },
  getChainName(state) {
    return state.chainName;
  },
  getWeb3(state) {
    if (state.web3) {
      return state.web3;
    } else {
      return new Web3(Web3.givenProvider);
    }
  },
  getWeb3Modal(state) {
    return state.web3Modal;
  },
  isUserConnected(state) {
    return state.isConnected;
  },
};

const actions = {
  async initWeb3Modal({ commit, dispatch }) {
    const w3mObject = new Web3Modal({
      cacheProvider: true,
    });

    // This will get deprecated soon. Setting it to false removes a warning from the console.
    //window.ethereum.autoRefreshOnNetworkChange = false;

    // if the user is flagged as already connected, automatically connect back to Web3Modal
    if (localStorage.getItem("isConnected") === "true") {
      const providerW3m = await w3mObject.connect();
      await commit("setIsConnected", true);

      await commit("setActiveAccount", window.ethereum.selectedAddress);
      await commit("setChainData", window.ethereum.chainId);
      await commit("setWeb3Provider", providerW3m);
      await dispatch("mint/fetchCarbonContract", {}, { root: true });
      await dispatch("fetchAccountData");
    }

    await commit("setWeb3ModalInstance", w3mObject);
  },

  async connectWeb3Modal({ state, commit, dispatch }) {
    try {
      let providerW3m = await state.web3Modal.connect();
      commit("setIsConnected", true);

      commit("setActiveAccount", window.ethereum.selectedAddress);
      commit("setChainData", window.ethereum.chainId);
      commit("setWeb3Provider", providerW3m);
      dispatch("fetchAccountData");
    } catch (e) {
      console.log("Could not connect to wallet...", e);
    }
  },

  async disconnectWeb3Modal({ commit }) {
    commit("disconnectWallet");
    commit("setIsConnected", false);
  },

  async fetchAccountData({ state, dispatch }) {
    console.log("Fetching account data..");
    await dispatch("fetchActiveBalance");
    await dispatch("fetchWhitelistStatus");
    await dispatch("fetchTokens");
    console.log("Fetched account data", {
      tokens: state.tokens,
      balance: state.activeBalance,
      address: state.activeAccount,
      isWhitelisted: state.isWhitelisted,
    });
  },

  async ethereumListener({ state, commit, dispatch }) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (state.isConnected) {
        commit("setActiveAccount", accounts[0]);
        commit("setWeb3Provider", state.providerW3m);
        dispatch("fetchAccountData");
      }
    });

    window.ethereum.on("chainChanged", (chainId) => {
      commit("setChainData", chainId);
      commit("setWeb3Provider", state.providerW3m);
      dispatch("fetchAccountData");
    });
  },

  async fetchTokens({ commit, getters }) {
    const account = getters.getActiveAccount;
    const { loadTransfers, transfersData } = useTransfers();
    await loadTransfers(account);
    if (transfersData.transfers.items.length > 0) {
      const tokens = transfersData.transfers.items.map(
        (transfer) => transfer.token
      );
      commit("setTokens", tokens);
    } else {
      commit("setTokens", []);
    }
  },

  async fetchActiveBalance({ state, commit }) {
    let balance = await state.web3.eth.getBalance(state.activeAccount);
    commit("setActiveBalance", balance);
  },

  async fetchWhitelistStatus({ commit, getters, rootGetters }) {
    commit("setWhitelistingStatus", true);
    const account = getters.getActiveAccount;
    let status = false;
    const contract = rootGetters["mint/getCarbonContract"];
    try {
      const minBalances = [1, 100, 1, 5, 300, 1];

      const balances = [
        await contract.methods.queryBalance(0, account).call(),
        await contract.methods.queryBalance(1, account).call(),
        await contract.methods.queryBalance(2, account).call(),
        await contract.methods.queryBalance(3, account).call(),
        await contract.methods.queryBalance(4, account).call(),
        await contract.methods.queryBalance(5, account).call(),
      ];

      minBalances.forEach((minBalance, index) => {
        if (balances[index] >= minBalance) {
          status = true;
        }
      });
    } catch (e) {
      status = true;
      console.log("cannot query balance", e);
    }
    commit("setWhitelistingStatus", false);
    commit("setWhitelisted", status);
  },
};

const mutations = {
  setTokens(state, tokens) {
    state.tokens = tokens;
  },

  setWhitelisted(state, status) {
    state.isWhitelisted = status;
  },

  setWhitelistingStatus(state, status) {
    state.isCheckingWhitelisting = status;
  },

  async disconnectWallet(state) {
    state.activeAccount = null;
    state.activeBalance = 0;
    state.web3 = null;
    if (state.providerW3m.close && state.providerW3m !== null) {
      await state.providerW3m.close();
    }
    state.providerW3m = null;
    await state.web3Modal.clearCachedProvider();
  },

  setActiveAccount(state, selectedAddress) {
    state.activeAccount = selectedAddress;
  },

  setActiveBalance(state, balance) {
    state.activeBalance = balance;
  },

  setChainData(state, chainId) {
    console.log("setChainData", chainId);
    state.chainId = chainId;

    switch (chainId) {
      case "0x1":
        state.chainName = "Mainnet";
        break;
      case "0x2a":
        state.chainName = "Kovan";
        break;
      case "0x3":
        state.chainName = "Ropsten";
        break;
      case "0x4":
        state.chainName = "Rinkeby";
        break;
      case "0x5":
        state.chainName = "Goerli";
        break;
      case "0x539": // 1337 (often used on localhost)
      case "0x1691": // 5777 (default in Ganache)
      default:
        state.chainName = "Localhost";
        break;
    }
  },

  async setWeb3Provider(state, providerW3m) {
    state.providerW3m = providerW3m;
    state.web3 = new Web3(providerW3m);
  },

  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
    // add to persistent storage so that the user can be logged back in when revisiting website
    localStorage.setItem("isConnected", isConnected);
  },

  setWeb3ModalInstance(state, w3mObject) {
    state.web3Modal = w3mObject;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
