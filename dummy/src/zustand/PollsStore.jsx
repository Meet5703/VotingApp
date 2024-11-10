import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import axiosInstence from "../utils/axiosInstence";
import { URL } from "../utils/variables";

const socket = io.connect(URL);

export const usePollsStore = create((set, get) => {
  socket.on("pollUpdated", (updatedPoll) => {
    set((state) => {
      const updatedPolls = state.polls.map((poll) =>
        poll._id === updatedPoll._id ? updatedPoll : poll
      );
      return { polls: updatedPolls };
    });
  });

  socket.on("voteUpdated", (updatedData) => {
    set((state) => ({
      pollData: {
        ...state.pollData,
        questions: state.pollData.questions.map((question) =>
          question._id === updatedData.questionId
            ? { ...question, options: updatedData.updatedOptions }
            : question
        ),
      },
    }));
  });

  return {
    polls: [],
    pollData: {
      title: "",
      questions: [{ question: "", options: [{ option: "" }] }],
    },

    fetchPolls: async () => {
      try {
        const response = await axiosInstence.get("/polls");
        set({ polls: response.data.data });
        return response.data.data;
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    },
    fetchPollsAssociatedWithUser: async () => {
      try {
        const token = jwtDecode(localStorage.getItem("token"));
        const userId = token.id;
        const response = await axiosInstence.get(`/polls/all/${userId}`);
        set({ polls: response.data.data });
        // toast.success("Polls fetched successfully!");
        return response.data.data;
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    },

    createPolls: async () => {
      try {
        const pollData = get().pollData;
        const response = await axiosInstence.post("/polls", pollData);
        console.log("Poll created:", response.data);
        await get().fetchPollsAssociatedWithUser();
        toast.success("Poll created successfully!");
      } catch (error) {
        toast.error("Poll creation failed. Please try again.");
        console.error("Error creating poll:", error);
      }
    },

    getSinglePoll: async (pollId) => {
      try {
        const response = await axiosInstence.get(`/polls/${pollId}`);
        set({ pollData: response.data.data });
        toast.success("Poll fetched successfully!");
        return response.data.data;
      } catch (error) {
        if (
          error.response.status === 404 ||
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          console.log(error.response.data.message);

          // document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          // window.location.replace("/login");
          toast.error(error.response.data.message);
        }
        console.error("Error fetching poll:", error);
      }
    },

    voteOnPoll: async (pollId, questionId, optionId) => {
      try {
        const response = await axiosInstence.post(
          `/polls/vote/${pollId}?optionId=${optionId}&questionId=${questionId}`
        );

        socket.on("pollUpdated", (updatedPoll) => {
          set((state) => ({
            polls: state.polls.map((poll) =>
              poll._id === updatedPoll._id ? updatedPoll : poll
            ),
            pollData:
              updatedPoll._id === state.pollData._id
                ? updatedPoll
                : state.pollData,
          }));
        });

        return response.data;
      } catch (error) {
        if (error.response.message === "Request failed with status code 500") {
          toast.error("You have already voted on this poll.");
        }
        console.error("Error voting on poll:", error);
      }
    },

    setPollTitle: (title) =>
      set((state) => ({ pollData: { ...state.pollData, title } })),

    setQuestion: (question, questionIdx) =>
      set((state) => {
        const questions = [...state.pollData.questions];
        questions[questionIdx].question = question;
        return { pollData: { ...state.pollData, questions } };
      }),

    setOption: (option, questionIdx, optionIdx) =>
      set((state) => {
        const questions = [...state.pollData.questions];
        questions[questionIdx].options[optionIdx].option = option;
        return { pollData: { ...state.pollData, questions } };
      }),

    addQuestion: () =>
      set((state) => ({
        pollData: {
          ...state.pollData,
          questions: [
            ...state.pollData.questions,
            { question: "", options: [{ option: "" }] },
          ],
        },
      })),

    addOption: (questionIdx) =>
      set((state) => {
        const questions = [...state.pollData.questions];
        questions[questionIdx].options.push({ option: "" });
        return { pollData: { ...state.pollData, questions } };
      }),

    resetPollData: () =>
      set({
        pollData: {
          title: "",
          questions: [{ question: "", options: [{ option: "" }] }],
        },
      }),

    declareResults: async (pollId, questionId) => {
      try {
        const response = await axiosInstence.put(
          `/polls/result/${pollId}?questionId=${questionId}`
        );
        console.log("Declared results:", response.data);
        toast.success("Results declared successfully!");
        return response.data;
      } catch (error) {
        toast.error("Results declaration failed. Please try again.");
        console.error("Error declaring results:", error);
      }
    },
    deletePoll: async (pollId) => {
      try {
        const response = await axiosInstence.delete(`/polls/${pollId}`);
        toast.success("Poll deleted successfully!");
        return response.data;
      } catch (error) {
        toast.error("Poll deletion failed. Please try again.");
        console.error("Error deleting poll:", error);
      }
    },
  };
});
