import { apiList } from "@/enum-list/enumList";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import supabaseAxiosInstance from "../axios-service/axios-supabase";

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

  // fetchAllUsers: async () => {
  //   const response = await axiosInstance.get(apiList.getAllUsers);
  //   return response.data.users;
  // },

  fetchSingleUser: async (id) => {
    const response = await axiosInstance.get(apiList.getAllUsers + `/${id}`);
    return response.data;
  },

  // updateUser: async (id, data) => {
  //   const response = await axiosInstance.put(
  //     apiList.getAllUsers + `/${id}`,
  //     data
  //   );
  // },

  fetchAllUsers: async () => {
    try {
      const response = await supabaseAxiosInstance.get("/users/getUsers");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users from Supabase:", error);
      return [];
    }
  },

  addUser: async (userData, setErrors) => {
    try {
      const response = await supabaseAxiosInstance.post(
        "/users/addUser",
        userData
      );
      return response.data;
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: error.response.data.error }));
      console.error("Error adding user:", error);
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await supabaseAxiosInstance.put("/users/updateUser", {
        id,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      console.log("service:", id);
      const response = await supabaseAxiosInstance.delete("/users/deleteUser", {
        data: { id },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
