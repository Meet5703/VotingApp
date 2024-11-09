import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/AuthStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const useAuthHook = () => {
  const router = useNavigate();
  const { user, setUser, signUp, signIn } = useAuthStore();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await signUp();
      if (response.status === 201) {
        toast.success("Sign up successful!");
        router("/login");
        return response;
      } else {
        toast.error("Sign up failed. Please try again.");
        return response;
      }
    } catch (error) {
      toast.error("Sign up failed. Please check your details.");
      console.error("Error during sign up:", error);
      return error.response;
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn();
      if (response.status === 200) {
        toast.success("Sign in successful!");
        router("/");
        return response;
      } else {
        toast.error("Sign in failed. Please try again.");
        return response;
      }
    } catch (error) {
      toast.error("Sign in failed. Please check your credentials.");
      console.error("Error during sign in:", error);
      return error.response;
    }
  };

  const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Convert the token to a boolean
    }, []);

    return {
      isAuthenticated,
      setIsAuthenticated,
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    toast.success("Logged out successfully!");
    window.location.replace("/login");
  };

  return {
    useAuth,
    router,
    user,
    handleInputChange,
    handleSignUp,
    handleSignIn,
    logout,
  };
};
