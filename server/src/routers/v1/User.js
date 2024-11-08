import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  signInController,
  updateUserController,
} from "../../controller/User.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUserController);

router.post("/signin", signInController);

router.get("/", isAuthenticated, getAllUsersController);

router.get("/:id", getUserByIdController);

router.put("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;
