const { default: axios } = require("axios");

const supabaseAxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});

export default supabaseAxiosInstance;
