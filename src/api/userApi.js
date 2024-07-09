import axios from "axios";
import config from "../constant/config";

const URL_USER = "user";
let accessToken = localStorage.getItem("accessToken");

const userApi = {
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${config.baseURL}${URL_USER}/getEvent`);
      return response.data;
    } catch (error) {
      console.error("Error getting all events:", error);
      throw error;
    }
  },

  getEventDetail: async (eventId) => {
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_USER}/eventDetail/${eventId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting event detail:", error);
      throw error;
    }
  },

  getBookingHistory: async () => {
    try {
      if (!accessToken) {
        throw new Error("Bạn cần đăng nhập để xem lịch sử đặt vé.");
      }
      const response = await axios.get(
        `${config.baseURL}${URL_USER}/history/active`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting booking history:", error);
      throw error;
    }
  },

  getCancelHistory: async () => {
    try {
      if (!accessToken) {
        throw new Error("Bạn cần đăng nhập để xem lịch sử hủy vé.");
      }
      const response = await axios.get(
        `${config.baseURL}${URL_USER}/history/noActive`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting cancel history:", error);
      throw error;
    }
  },

  eventRegister: async (idEvent) => {
    try {
      if (!accessToken) {
        throw new Error("Bạn cần đăng nhập để đăng ký sự kiện.");
      }
      const response = await axios.post(
        `${config.baseURL}${URL_USER}/add/${idEvent}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering for event:", error);
      throw error;
    }
  },

  cancelEvent: async (idEvent) => {
    try {
      if (!accessToken) {
        throw new Error("Bạn cần đăng nhập để hủy sự kiện.");
      }
      const response = await axios.post(
        `${config.baseURL}${URL_USER}/cancel/${idEvent}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error canceling event:", error);
      throw error;
    }
  },
};

export default userApi;
