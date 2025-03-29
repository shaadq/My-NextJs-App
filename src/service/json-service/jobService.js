import supabaseAxiosInstance from "../axios-service/axios-supabase";

export const jobService = {
  getJobs: async () => {
    try {
      const response = await supabaseAxiosInstance.get("/jobs/listing/getJobs");
      return response.data.jobs;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  //   Categories
  getCategories: async () => {
    try {
      const response = await supabaseAxiosInstance.get(
        "/jobs/category/getCategories"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categoies:", error);
      throw error;
    }
  },

  addCategory: async (obj) => {
    try {
      const response = await supabaseAxiosInstance.get(
        "/jobs/category/addCategory",
        obj
      );
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  },
};
