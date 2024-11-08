import { JWT_SECRET } from "../configs/variablesConfig.js";
import jwt from "jsonwebtoken";

const findToken = (req) => {
  const cookieToken = req.cookies.token;
  if (cookieToken) {
    console.log("Token found in cookies:", cookieToken);
    return cookieToken;
  }
  const headerToken = req.headers.authorization;
  if (headerToken) {
    const splitToken = headerToken.split(" ")[1];
    console.log("Token found in headers:", splitToken);
    return splitToken;
  }
  console.log("No token found");
  return null;
};
export const isAuthenticated = (req, res, next) => {
  const token = findToken(req);

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  next();
};
