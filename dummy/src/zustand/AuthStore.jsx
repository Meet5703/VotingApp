import { create } from "zustand";
import axiosInstence from "../utils/axiosInstence.js";

export const useAuthStore = create((set, get) => ({
  user: {
    username: "",
    email: "",
    password: "",
  },
  setUser: (user) => set({ user }),

  signUp: async () => {
    try {
      const user = get().user;
      const response = await axiosInstence.post("/users/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      set({ user: response.data });
      localStorage.setItem("token", response.data.token);
      window.location.replace("/");
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  signIn: async () => {
    try {
      const user = get().user;
      const response = await axiosInstence.post("/users/signin", {
        email: user.email,
        password: user.password,
      });

      set({ user: response.data });
      localStorage.setItem("token", response.data.token);
      window.location.replace("/");
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
}));
