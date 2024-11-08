import express from "express";
import http from "http"; // Import the HTTP module to create the server
import { Server } from "socket.io"; // Import the Socket.IO server
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import { Poll } from "./models/Poll.js"; // Import your Poll model
import { JWT_SECRET, PORT } from "./configs/variablesConfig.js";
import cors from "cors";
import { verifyToken } from "./utils/JWT.js";
import { updateVotesRepo } from "./repository/Poll.js";
import { jwtDecode } from "jwt-decode";
const app = express();
const server = http.createServer(app); // Create an HTTP server
export const io = new Server(server, { cors: { origin: "*" } });

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api", apiRouter);

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
