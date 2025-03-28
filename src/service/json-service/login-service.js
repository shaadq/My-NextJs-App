import supabaseAxiosInstance from "../axios-service/axios-supabase";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const loginService = {
  getToken: async (obj) => {
    try {
      const response = await supabaseAxiosInstance.post("/auth/userLogin", obj);

      if (response.status === 200) {
        Cookies.set("token", response.data.accessToken, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 }); // Stringify user object
        toast.success("Login successful");
        return response.status;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  },
};
