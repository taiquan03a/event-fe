import axios from "axios";
import config from "../constant/config";

const URL_Admin = "admin";

const adminApi = {
  getAllUser: async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_Admin}/user/all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  },

  activeUser: async (userId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/user/delete/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error activating user ${userId}:`, error);
      throw error;
    }
  },

  getAllEvent: async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_Admin}/event/all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting all events:", error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    let accessToken = localStorage.getItem("accessToken");
    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("image", eventData.image);
    formData.append("name", eventData.name);
    formData.append("begin", eventData.begin);
    formData.append("end", eventData.end);
    formData.append("description", eventData.description);
    formData.append("quantity", eventData.quantity);
    formData.append("province", eventData.province);
    formData.append("district", eventData.district);
    formData.append("ward", eventData.ward);
    formData.append("detail", eventData.detail);
    formData.append("supplierId", eventData.supplierId);

    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/event/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  editEvent: async (eventId, eventData) => {
    let accessToken = localStorage.getItem("accessToken");

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("image", eventData.image);
    formData.append("name", eventData.name);
    formData.append("begin", eventData.begin);
    formData.append("end", eventData.end);
    formData.append("description", eventData.description);
    formData.append("quantity", eventData.quantity);
    formData.append("province", eventData.province);
    formData.append("district", eventData.district);
    formData.append("ward", eventData.ward);
    formData.append("detail", eventData.detail);
    formData.append("supplierId", eventData.supplierId);

    try {
      const response = await axios.put(
        `${config.baseURL}${URL_Admin}/event/update/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error editing event ${eventId}:`, error);
      throw error;
    }
  },

  activeEvent: async (eventId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/event/delete/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error active event ${eventId}:`, error);
      throw error;
    }
  },
  getAllSuplier: async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_Admin}/supplier/all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting all suppliers:", error);
      throw error;
    }
  },
  getAllSuplierActive: async () => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_Admin}/supplier/allActive`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting all suppliers:", error);
      throw error;
    }
  },

  createSuplier: async (suplierData) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/supplier/create`,
        suplierData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  },

  editSuplier: async (suplierId, suplierData) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `${config.baseURL}${URL_Admin}/supplier/edit/${suplierId}`,
        suplierData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error editing supplier ${suplierId}:`, error);
      throw error;
    }
  },

  activeSuplier: async (suplierId) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/supplier/active/${suplierId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error active supplier ${suplierId}:`, error);
      throw error;
    }
  },
};

export default adminApi;
