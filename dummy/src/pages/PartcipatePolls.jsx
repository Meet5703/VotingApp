import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePollsStore } from "../zustand/PollsStore"; // Adjust path as needed

const ParticipatePolls = () => {
  const { polls, fetchPolls, loading } = usePollsStore();

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg p-6 h-32 animate-pulse"
        ></div>
      ))}
    </div>
  );

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Available Polls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          renderSkeleton()
        ) : polls.length > 0 ? (
          polls.map((poll, pollIdx) => {
            // Check if all questions have declared results
            const allQuestionsDeclared = poll.questions.every(
              (question) => question.result
            );

            return (
              <Link
                to={`/polls/${poll._id}`} // Link to poll-specific page
                key={pollIdx}
                className="block bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {poll.title}
                </h4>
                <p className="text-gray-600">
                  Created by: {poll.createdBy?.username || "Unknown"}
                </p>
                <p className="text-gray-600">
                  Participants: {poll.participants.length}
                </p>
                <p className="text-gray-600">
                  Date: {new Date(poll.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-4 flex justify-center">
                  <button
                    className={` text-white px-4 py-2 rounded hover:bg-green-600 ${
                      allQuestionsDeclared ? "bg-blue-500" : "bg-green-500"
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevents navigation when clicking this button
                      window.location.href = `/polls/${poll._id}`;
                    }}
                  >
                    {allQuestionsDeclared ? "See Results" : "Participate"}
                  </button>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No available polls.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipatePolls;
