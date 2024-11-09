import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Router>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
