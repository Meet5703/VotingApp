// Your existing imports
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import { FRONTEND_URL, JWT_SECRET, PORT } from "./configs/variablesConfig.js";
import cors from "cors";
import { verifyToken } from "./utils/JWT.js";
import { updateVotesRepo } from "./repository/Poll.js";
import { jwtDecode } from "jwt-decode";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Update CORS configuration
app.use(
  cors({
    origin: "https://voting-app-mkprojects.vercel.app", // Remove trailing slash
    credentials: true, // Allow cookies to be sent
  })
);

// API routes
app.use("/api", apiRouter);

// Socket.io configuration
io.on("connection", (socket) => {
  console.log("New connection established:", socket.id);

  socket.on("voteUpdated", async ({ pollId, questionId, optionId }) => {
    try {
      const token = socket.handshake.auth.token;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log({
        token: token,
        userId: userId,
        pollId: pollId,
        questionId: questionId,
        optionId: optionId,
      });

      const updatedPoll = await updateVotesRepo(
        pollId,
        userId,
        questionId,
        optionId
      );
      console.log(
        "Emitting pollUpdated event with updated poll data:",
        updatedPoll
      );
    } catch (error) {
      console.error("Vote error:", error.message);
      socket.emit("vote_error", "An error occurred while voting");
    }
  });

  socket.on("disconnect", () => {
    console.log("User  disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
