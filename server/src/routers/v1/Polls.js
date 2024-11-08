import express from "express";
import {
  createPolls,
  declareResults,
  deletePollController,
  getAllPollsController,
  getPollByIdController,
  getPollsAssociatedWithUser,
  updatePollController,
  voteController,
} from "../../controller/Polls.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createPolls);
router.get("/", getAllPollsController);
router.get("/all", isAuthenticated, getPollsAssociatedWithUser);
router.get("/:pollId", isAuthenticated, getPollByIdController);
router.put("/result/:pollId", isAuthenticated, declareResults);
router.post("/vote/:pollId", isAuthenticated, voteController);
router.put("/:pollId", isAuthenticated, updatePollController);
router.delete("/:pollId", isAuthenticated, deletePollController);

export default router;
