import axios from "axios";
import { BACK_URL } from "./variables.js";

const axiosInstance = axios.create({
  baseURL: BACK_URL,
  withCredentials: true, // This is important if you're dealing with cookies
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json", // Set the content type if needed
  },
});

// Optional: Interceptors for request and response
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch the token dynamically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
