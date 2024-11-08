import express from "express";
import userRouter from "./User.js";
import pollRouter from "./Polls.js";
const app = express();

app.use("/users", userRouter);
app.use("/polls", pollRouter);

export default app;
