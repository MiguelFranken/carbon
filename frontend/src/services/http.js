import axios from "axios";

const http = axios.create({
  timeout: 15000,
  baseURL: process.env.VUE_APP_API_ADDRESS,
});

export default http;
