import axios from "axios";
import { BACK_URL } from "./variables.js";

const axiosInstence = axios.create({
  baseURL: BACK_URL,
  withCredentials: true,
  headers: {
    "X-ORIGIN": "https://votingapp-tr0s.onrender.com",
  },
});

export default axiosInstence;
