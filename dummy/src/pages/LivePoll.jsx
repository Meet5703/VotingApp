import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
import { usePollsStore } from "../zustand/PollsStore";
import { jwtDecode } from "jwt-decode"; // Ensure proper import
import { io } from "socket.io-client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const socket = io("http://localhost:3000", {
  auth: {
    token: localStorage.getItem("token"), // Pass the token here
  },
});

const LivePoll = () => {
  const { pollId } = useParams();
  const [showCharts, setShowCharts] = useState([]); // Visibility controlled by the owner
  const [pollData, setPollData] = useState({ questions: [] });
  const [currentUserId, setCurrentUserId] = useState(null);
  const { getSinglePoll, voteOnPoll, declareResults } = usePollsStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setCurrentUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    fetchPollData();

    socket.on("pollUpdated", (updatedPoll) => {
      console.log("Poll updated:", updatedPoll);
      if (updatedPoll._id === pollId) {
        setPollData(updatedPoll); // Update the poll data with the new state
      }
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, [pollId]);

  const fetchPollData = async () => {
    try {
      const fetchedPollData = await getSinglePoll(pollId);
      if (fetchedPollData && fetchedPollData.questions) {
        setPollData(fetchedPollData);
        setShowCharts(new Array(fetchedPollData.questions.length).fill(false));
      } else {
        console.error(
          "Fetched poll data does not have questions:",
          fetchedPollData
        );
        setPollData({ questions: [] });
      }
    } catch (error) {
      console.error("Error fetching poll data:", error);
      setPollData({ questions: [] });
    }
  };

  const handleVote = async (questionIndex, optionIndex) => {
    try {
      const optionId =
        pollData.questions[questionIndex]?.options[optionIndex]?._id;
      const questionId = pollData.questions[questionIndex]._id; // Ensure this is set correctly

      if (optionId && questionId) {
        await voteOnPoll(pollId, optionId); // Make sure this function is updated to accept questionId
        console.log("Emitting voteUpdated with data:", {
          pollId,
          questionId,
          optionId,
        });
        socket.emit("voteUpdated", {
          pollId,
          questionId,
          optionId,
        });
        fetchPollData(); // Fetch updated data after voting
      } else {
        console.error("Invalid option ID or question ID for voting");
      }
    } catch (error) {
      console.error("Error during vote:", error);
    }
  };

  const handleToggleChartVisibility = (questionIndex) => {
    if (isPollOwner) {
      setShowCharts((prev) => {
        const newVisibility = [...prev];
        newVisibility[questionIndex] = !newVisibility[questionIndex];
        return newVisibility;
      });
    }
  };

  const handleStopPoll = (questionId) => {
    declareResults(pollId, questionId);
  };

  if (!pollData.questions || pollData.questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Loading...
      </div>
    );
  }

  const isPollOwner = currentUserId === pollData.createdBy;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#1D2330] text-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{pollData.title}</h2>
        <p className="text-gray-300 mt-2">
          Created by: {pollData.createdBy?.username || "Unknown"}
        </p>
        <p className="text-gray-300">
          Poll created on: {new Date(pollData.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        {pollData.questions.map((question, questionIndex) => {
          // Check if the question has a declared result
          if (question.result) {
            return (
              <div
                key={question._id}
                className="p-6 bg-[#2D3748] border border-gray-600 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {question.question}
                </h3>
                <p className="mt-4 text-lg font-bold text-green-600">
                  {`Winner: ${question.result}`}
                </p>
              </div>
            );
          }

          return (
            <div
              key={question._id}
              className="p-6 bg-[#2D3748] border border-gray-600 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-200 mb-4">
                {question.question}
              </h3>

              {isPollOwner && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => handleToggleChartVisibility(questionIndex)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    {showCharts[questionIndex] ? "Hide Chart" : "Show Chart"}
                  </button>
                </div>
              )}

              {(isPollOwner || showCharts[questionIndex]) && (
                <div className="mb-4">
                  <Bar
                    data={{
                      labels: question.options.map((option) => option.option),
                      datasets: [
                        {
                          label: "Votes",
                          data: question.options.map((option) => option.votes),
                          backgroundColor: "rgba(75, 192, 192, 0.7)",
                          borderColor: "rgba(75, 192, 192, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    style={{ height: "400px" }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              )}

              <div className="space-y-4">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={option._id}
                    className="flex justify-between items-center"
                  >
                    <button
                      onClick={() => handleVote(questionIndex, optionIndex)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      {option.option}
                    </button>
                    <span className="text-gray-300">{option.votes} Votes</span>
                  </div>
                ))}
              </div>

              {isPollOwner && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => handleStopPoll(question._id)}
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                  >
                    Stop Poll for this Question
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LivePoll;
