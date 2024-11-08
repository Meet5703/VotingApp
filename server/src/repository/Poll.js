import { io } from "../index.js";
import { Poll } from "../models/Poll.js";

export const createPollRepo = async ({ title, questions, createdBy }) => {
  try {
    const poll = await Poll.create({ title, questions, createdBy });
    return poll;
  } catch (error) {
    console.log(error);
    throw new Error("Error while creating poll at repository", error.message);
  }
};

export const getAllPollsRepoAssociatedWithUser = async (userId) => {
  try {
    const polls = await Poll.find({ createdBy: userId });
    return polls;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};

export const getPollByIdRepo = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePollRepo = async (pollId) => {
  try {
    const poll = await Poll.findByIdAndDelete(pollId);
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePollRepo = async (pollId, updateObject) => {
  try {
    const poll = await Poll.findByIdAndUpdate(pollId, updateObject, {
      new: true,
    });
    return poll;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateVotesRepo = async (pollId, userId, questionId, optionId) => {
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new Error("Poll not found");
    }
    if (!userId || !optionId) {
      throw new Error("User  ID and Option ID are required for voting");
    }

    const existingVote = poll.participants.find(
      (participant) =>
        participant.userId.equals(userId) &&
        participant.optionId.equals(optionId)
    );

    if (existingVote) {
      throw new Error("User  has already voted on this option");
    }

    const questionContainingOption = poll.questions.find(
      (q) =>
        q._id.equals(questionId) &&
        q.options.some((o) => o._id.equals(optionId))
    );

    if (!questionContainingOption) {
      throw new Error("Question containing the option not found");
    }

    const existingVoteInQuestion = poll.participants.find(
      (participant) =>
        participant.userId.equals(userId) &&
        questionContainingOption.options.some((o) =>
          o._id.equals(participant.optionId)
        )
    );

    if (existingVoteInQuestion) {
      const previousOption = questionContainingOption.options.find((o) =>
        o._id.equals(existingVoteInQuestion.optionId)
      );
      if (previousOption) previousOption.votes--;
      poll.participants = poll.participants.filter(
        (participant) =>
          !participant.userId.equals(userId) ||
          !participant.optionId.equals(existingVoteInQuestion.optionId)
      );
    }

    const option = questionContainingOption.options.find((o) =>
      o._id.equals(optionId)
    );
    if (!option) {
      throw new Error("Option not found");
    }

    option.votes++;
    poll.participants.push({ userId, optionId });
    await poll.save();
    io.emit("pollUpdated", poll); // Emit updated poll to all clients

    return poll;
  } catch (error) {
    console.error("Vote error:", error);
    throw new Error("An error occurred while voting");
  }
};

export const getAllPollsRepo = async () => {
  try {
    const polls = await Poll.find().populate("createdBy", "username");
    return polls;
  } catch (error) {
    throw new Error(error.message);
  }
};
