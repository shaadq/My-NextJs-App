const { default: axios } = require("axios");

const supabaseAxiosInstance = axios.create({
  baseURL: "/api", // Calls your Next.js API routes
  headers: {
    Accept: "application/json",
  },
});

export default supabaseAxiosInstance;
