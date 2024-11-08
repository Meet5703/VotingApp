import { Poll } from "../models/Poll.js";
import {
  createPollRepo,
  deletePollRepo,
  getAllPollsRepo,
  getAllPollsRepoAssociatedWithUser,
  getPollByIdRepo,
  updatePollRepo,
  updateVotesRepo,
} from "../repository/Poll.js";

export const createPollService = async ({ title, questions, createdBy }) => {
  try {
    const poll = await createPollRepo({ title, questions, createdBy });
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPollsByUserService = async (id) => {
  try {
    const polls = await getAllPollsRepoAssociatedWithUser(id);
    return polls;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePollService = async (pollId, updateObject) => {
  try {
    const poll = await updatePollRepo(pollId, updateObject);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePollService = async (pollId) => {
  try {
    const poll = await deletePollRepo(pollId);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPollByIdService = async (pollId) => {
  try {
    const poll = await getPollByIdRepo(pollId);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const voteService = async (pollId, userId, optionId) => {
  try {
    const poll = await updateVotesRepo(pollId, userId, optionId);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPollsService = async () => {
  try {
    const polls = await getAllPollsRepo();
    return polls;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const declareResultsService = async (pollId, questionId) => {
  try {
    const poll = await Poll.findById(pollId).populate(
      "questions.options.option"
    );
    if (!poll) {
      throw new Error("Poll not found");
    }
    const question = poll.questions.id(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    let maxVotes = -1;
    let winningOption = null;
    for (const option of question.options) {
      if (option.votes > maxVotes) {
        maxVotes = option.votes;
        winningOption = option.option;
      }
    }
    question.result = winningOption;
    await poll.save();
    return {
      message: "Poll results declared successfully",
      data: poll,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
