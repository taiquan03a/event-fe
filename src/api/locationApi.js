import axios from "axios";
const URL_LOCATION = "https://esgoo.net/api-tinhthanh";
const locationApi = {
  async getProvince() {
    try {
      const response = await axios.get(`${URL_LOCATION}/1/0.htm`);
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  },

  async getDistrict(provinceCode) {
    try {
      const response = await axios.get(`${URL_LOCATION}/2/${provinceCode}.htm`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching districts for province ${provinceCode}:`,
        error
      );
      throw error;
    }
  },

  async getWard(districtCode) {
    try {
      const response = await axios.get(`${URL_LOCATION}/3/${districtCode}.htm`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching wards for district ${districtCode}:`,
        error
      );
      throw error;
    }
  },
};

export default locationApi;
