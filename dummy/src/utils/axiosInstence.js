import axios from "axios";
import { BACK_URL } from "./variables.js";

const axiosInstence = axios.create({
  baseURL: BACK_URL,
  withCredentials: true,
});

export default axiosInstence;
