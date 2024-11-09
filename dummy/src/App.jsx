import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthHook } from "./hooks/useAuthHook";
import Home from "./pages/Home";
import ParticipatePolls from "./pages/ParticipatePolls"; // Corrected import
import MyPolls from "./pages/myPolls";
import LivePoll from "./pages/LivePoll";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthenticated } = useAuthHook().useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/participate" element={<ParticipatePolls />} />
        <Route path="/polls" element={<MyPolls />} />
        <Route path="/polls/:pollId" element={<LivePoll />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
      </Route>
    </Routes>
  );
}

export default App;
