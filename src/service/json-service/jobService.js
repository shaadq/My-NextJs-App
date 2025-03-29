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

  addJob: async (data) => {
    try {
      const response = await supabaseAxiosInstance.post(
        "/jobs/listing/addJob",
        data
      );
      return response.data; // Ensure you return the response data
    } catch (error) {
      console.error("Error adding job:", error);
      throw error; // Re-throw error for proper error handling
    }
  },

  updateJob: async (id, data) => {
    try {
      const response = await supabaseAxiosInstance.put(
        "/jobs/listing/updateJob",
        {
          id,
          data: data,
        }
      );

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
      return response.data.categories;
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
