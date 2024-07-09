import axios from "axios";
import config from "../constant/config";

const URL_Admin = "admin";
let accessToken = localStorage.getItem("accessToken");

const adminApi = {
  getAllUser: async () => {
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
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/event/create`,
        eventData,
        {
          headers: {
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
    try {
      const response = await axios.put(
        `${config.baseURL}${URL_Admin}/event/update/${eventId}`,
        eventData,
        {
          headers: {
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
    try {
      const response = await axios.post(
        `${config.baseURL}${URL_Admin}/event/delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error);
      throw error;
    }
  },
};

export default adminApi;
