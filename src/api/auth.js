import axios from "axios";
import config from "../constant/config";

const authApi = {
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${config.baseURL}auth/register`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(
        `${config.baseURL}auth/login`,
        loginData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
};

export default authApi;
