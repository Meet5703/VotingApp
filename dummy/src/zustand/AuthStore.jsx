import { create } from "zustand";
import axiosInstence from "../utils/axiosInstence";
import toast from "react-hot-toast";

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
      toast.success("Sign up successful! Redirecting to login...");
      window.location.replace("/login");
      return response;
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
      console.error("Sign up error:", error);
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
      toast.success("Sign in successful! Redirecting...");
      window.location.replace("/");
      return response;
    } catch (error) {
      toast.error("Sign in failed. Please check your credentials.");
      console.error("Sign in error:", error);
      return error.response;
    }
  },
}));
