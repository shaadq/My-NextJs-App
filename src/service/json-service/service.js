import { apiList } from "@/enum-list/enumList";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const { default: axiosInstance } = require("../axios-service/axiosInstance");

export const myServices = {
  getToken: async (obj) => {
    try {
      const response = await axiosInstance.post(apiList.getToken, obj);

      if (response?.data?.accessToken) {
        Cookies.set("token", response.data.accessToken, { expires: 1 });
        const userInfo = await myServices.authenticate();
        return userInfo;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  authenticate: async () => {
    const token = Cookies.get("token");
    try {
      const response = await axiosInstance.get(apiList.authorization, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
      if (response?.status === 200) {
        Cookies.set("user", JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  fetchAllProducts: async () => {
    const response = await axiosInstance.get(apiList.getProducts);
    return response.data.products;
  },

  fetchProductByID: async (id) => {
    const response = await axiosInstance.get(apiList.getProducts + `/${id}`);
    return response.data;
  },

  fetchAllCategories: async () => {
    const response = await axiosInstance.get(apiList.getProductCategories);
    return response.data;
  },

  fetchAllUsers: async () => {
    const response = await axiosInstance.get(apiList.getAllUsers);
    return response.data.users;
  },

  fetchSingleUser: async (id) => {
    const response = await axiosInstance.get(apiList.getAllUsers + `/${id}`);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await axiosInstance.put(
      apiList.getAllUsers + `/${id}`,
      data
    );

    console.log(response);
  },
};
