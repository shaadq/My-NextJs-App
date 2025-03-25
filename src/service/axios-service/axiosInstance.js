const { default: axios } = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
