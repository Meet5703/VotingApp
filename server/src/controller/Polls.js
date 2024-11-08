import mongoose from "mongoose";
import { getAllPollsRepoAssociatedWithUser } from "../repository/Poll.js";
import {
  createPollService,
  declareResultsService,
  deletePollService,
  getAllPollsService,
  getPollByIdService,
  updatePollService,
  voteService,
} from "../services/Poll.js";

export const createPolls = async (req, res) => {
  try {
    const { title, questions } = req.body; // Updated to match new schema
    const createdBy = req.user.id;
    const poll = await createPollService({ title, questions, createdBy });
    return res.status(201).json({
      message: "Poll created successfully",
      data: poll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const voteController = async (req, res) => {
  try {
    const { pollId } = req.params;
    const userId = req.user.id;
    const { optionId } = req.query;

    const poll = await voteService(pollId, userId, optionId);

    return res.status(200).json({
      message: "Vote recorded successfully",
      data: poll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPollsAssociatedWithUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const polls = await getAllPollsRepoAssociatedWithUser(userId);
    return res.status(200).json({
      message: "Polls fetched successfully",
      data: polls,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPollByIdController = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await getPollByIdService(pollId);
    return res.status(200).json({
      message: "Poll fetched successfully",
      data: poll,
    });
  } catch (error) {
    if (error.status === 401) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};
export const getAllPollsController = async (req, res) => {
  try {
    const polls = await getAllPollsService();

    return res.status(200).json({
      message: "Polls fetched successfully",
      data: polls,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePollController = async (req, res) => {
  try {
    const { pollId } = req.params;
    const updateObject = req.body;
    if (!mongoose.isValidObjectId(pollId)) {
      return res.status(400).json({ message: "Invalid poll ID format" });
    }

    const poll = await updatePollService(pollId, updateObject);
    return res.status(200).json({
      message: "Poll updated successfully",
      data: poll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePollController = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await deletePollService(pollId);
    return res.status(200).json({
      message: "Poll deleted successfully",
      data: poll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const declareResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { questionId } = req.query;
    const poll = await declareResultsService(pollId, questionId);
    return res.status(200).json({
      message: "Results declared successfully",
      data: poll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
