import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/AuthStore";
import { useToaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export const useAuthHook = () => {
  const toast = useToaster();
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
        toast.push("Sign up successful");
        router("/login");
        return response;
      } else {
        toast.push("Signup failed. Please try again.");
        return response;
      }
    } catch (error) {
      toast.push("Signup failed. Please try again.");
      return error.response;
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn();
      if (response.status === 200) {
        return response;
      } else {
        console.log(response);
        return response;
      }
    } catch (error) {
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
