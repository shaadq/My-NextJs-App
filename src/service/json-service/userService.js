import supabaseAxiosInstance from "../axios-service/axios-supabase";
import { userProfilesService } from "./userProfilesService";

const { default: axiosInstance } = require("../axios-service/axiosInstance");

export const userService = {
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
      await userProfilesService.deleteUserProfile(id);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  getRecruiters: async () => {
    try {
      const response = await supabaseAxiosInstance.get("/users/getRecruiters");
      return response.data.recruiters;
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      throw error;
    }
  },
};
