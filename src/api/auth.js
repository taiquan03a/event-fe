import axios from "axios";
import config from "../constant/config";
const URL_AUTH = "auth";
const authApi = {
  register: async (userData) => {
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_AUTH}/register`,
        userData
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
        `${config.baseURL}${URL_AUTH}/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
};

export default authApi;
