import mongoose from "mongoose";
import { MONGODB_URI } from "./variablesConfig.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    conn.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};
