import http from "@/services/http";
import { computed, reactive } from "vue";

const state = reactive({
  token: null,
  isLoading: true,
});

export default function useToken() {
  async function getTokenCount() {
    try {
      state.isLoading = true;
      const response = await http.get(`/token/count`);
      return response.data;
    } catch (error) {
      console.error("Could not load token count", error);
    }
  }

  async function loadToken(id) {
    try {
      state.isLoading = true;
      const response = await http.get(`/token/${id}`);
      state.token = response.data;
    } finally {
      state.isLoading = false;
    }
  }

  function getImageSrc(token) {
    return `/diamonds/${token.size}.png`;
  }

  const imageIdentifiers = [
    "bafybeidgznl4kxsrvcnob2mjxaugxsewvomt2ugumuek6jkmwg2qnplbhy",
    "bafybeiddwhda4ucs3oqlvrqabc2oiluumv7zrsyuq3er3zzlcgcuwltod4",
    "bafybeiazprkpomsikvdxyrur75freaqopon4pxhzq2bvt6w6hzx7yga6qa",
    "bafybeicymvym3nlkmepptxznn6mlc5pjt6xn4gzxzukja5wyri3t4zawwi",
    "bafybeifb3upudkwuw7gq5yqnbtss2r22hjnz5ngwybsxywg6w64fnzkphm",
    "bafybeiarocxbhl2vx52thdhebsjdn7dbmaxjk6e2e6ivw5opsi4ihsmtma",
    "bafybeidj7eio5gspvapwux2oxupju35aprrvcrudsvscsnmbshrtzhrose",
    "bafybeigli4kkcnts7q3kcgegdf6lvnboml5g4eepwpwcozkzgq2ihfj4mm",
    "bafybeifiyx2etlte2ebhj2glgixtwu5d4xjqt3qrbmmdfjqqxd6zgliglm",
    "bafybeidodcrxbwdzpopchv5xdn7nj5adrus6xgelusd6r6cfc2spb6t3g4",
    "bafybeidzb6zbvffokobhko4rstlau4x6jwi6r42ifu2stuhogfr74kecnu",
  ];

  const metadataIdentifiers = [
    "bafybeiesbbihtfdj3kqbah5642p7drsb6hrzwzksezbgb2t2ojjwgh2k5m",
    "bafybeifclnruolpdcsouhmzhnardvpzroxk6qouc53drw4vh2f3zdoouya",
    "bafybeihbeszvaoc3exx6ji77g74nyuqmoz2scdykudna3qd6xzgygn36ra",
    "bafybeidl3uswhq65hnfvgj6bfahbvdb57y7cxiaelgct6q7raweubcms6u",
    "bafybeifx2hrh6mhbpcivo4z53l76uqwc6fth4nf4qah6aow7e62lcka3d4",
  ];

  const openseaLink = computed(() => {
    if (state.isLoading) {
      return null;
    }

    const id = state.token.id;
    return `https://opensea.io/assets/0x2adcfafb356f0942b8432c036dda41f6c0d2877f/${id}`;
  });

  const ipfsMetadataHttp = computed(() => {
    if (state.isLoading) {
      return null;
    }

    const id = state.token.id;
    let cid;
    if (id <= 2000) {
      cid = metadataIdentifiers[0];
    } else if (id <= 4000) {
      cid = metadataIdentifiers[1];
    } else if (id <= 6000) {
      cid = metadataIdentifiers[2];
    } else if (id <= 8000) {
      cid = metadataIdentifiers[3];
    } else {
      cid = metadataIdentifiers[4];
    }

    return state.token
      ? `https://ipfs.io/ipfs/${cid}/${state.token.size}_${state.token.id}.json`
      : null;
  });

  const ipfsDiamondImageHttp = computed(() => {
    if (state.isLoading) {
      return null;
    }
    return state.token
      ? `https://ipfs.io/ipfs/${imageIdentifiers[+state.token.size - 1]}/${
          state.token.size
        }_${state.token.id}.svg`
      : null;
  });

  return {
    tokenData: state,
    loadToken,
    getTokenCount,
    getImageSrc,
    ipfsMetadataHttp,
    ipfsDiamondImageHttp,
    openseaLink,
  };
}
