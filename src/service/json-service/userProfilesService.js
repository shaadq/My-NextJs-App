import supabaseAxiosInstance from "../axios-service/axios-supabase";

export const userProfilesService = {
  getUserProfiles: async () => {
    try {
      const response = await supabaseAxiosInstance.get(
        "/userProfiles/getUserProfiles"
      );
      return response.data;
    } catch (error) {}
  },

  getUserProfileByUserId: async (id) => {
    try {
      const response = await supabaseAxiosInstance.get(
        `/userProfiles/getUserProfileByUserId`,
        { params: { user_id: id } }
      );
      return response.data.profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  addUserProfile: async (obj) => {
    try {
      const response = await supabaseAxiosInstance.post(
        "/userProfiles/addUserProfile",
        obj
      );
    } catch (error) {}
  },

  updateUserProfile: async (user_id, updatedData) => {
    console.log(updatedData);
    try {
      const response = await supabaseAxiosInstance.put(
        "/userProfiles/updateUserProfile",
        { user_id, data: updatedData }
      );
      return response.data; // Return response data
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; // Handle errors
    }
  },

  deleteUserProfile: async (user_id) => {
    try {
      const response = await supabaseAxiosInstance.delete(
        "/userProfiles/deleteUserProfile",
        { data: { user_id } }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  },
};
