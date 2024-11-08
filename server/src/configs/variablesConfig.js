import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const URL = process.env.URL;
