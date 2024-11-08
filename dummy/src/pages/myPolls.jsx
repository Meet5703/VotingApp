import { useEffect } from "react";
import { usePollsStore } from "../zustand/PollsStore";
import { Link } from "react-router-dom";

const MyPolls = () => {
  const {
    polls,
    fetchPolls,
    createPolls,
    pollData,
    setPollTitle,
    setQuestion,
    setOption,
    addQuestion,
    addOption,
    resetPollData,
  } = usePollsStore();

  useEffect(() => {
    fetchPolls();
    console.log(polls);
  }, [fetchPolls]);

  const handleInputChange = (e, questionIdx, optionIdx) => {
    const { name, value } = e.target;
    if (name === "title") {
      setPollTitle(value);
    } else if (name === "question") {
      setQuestion(value, questionIdx);
    } else if (name === "option") {
      setOption(value, questionIdx, optionIdx);
    }
  };

  const handleCreatePoll = async () => {
    await createPolls();

    resetPollData();
  };

  return (
    <div className="p-6 space-y-10 min-h-screen">
      <div className="bg-zinc-700 shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-bold text-center mb-8 text-white">
          Create New Poll
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <label className="block text-lg text-white font-semibold mb-2">
              Poll Title
            </label>
            <input
              type="text"
              placeholder="Enter poll title"
              name="title"
              value={pollData.title}
              onChange={handleInputChange}
              className="w-full bg-zinc-600 text-white p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="col-span-2">
            {pollData.questions.map((question, questionIdx) => (
              <div key={questionIdx} className="space-y-4 mb-6">
                <label className="block text-lg text-white font-semibold mb-2">
                  Question {questionIdx + 1}
                </label>
                <input
                  type="text"
                  placeholder="Enter question"
                  name="question"
                  value={question.question}
                  onChange={(e) => handleInputChange(e, questionIdx)}
                  className="w-full bg-zinc-600 text-white p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
                {question.options.map((option, optionIdx) => (
                  <input
                    key={optionIdx}
                    type="text"
                    placeholder={`Option ${optionIdx + 1}`}
                    name="option"
                    value={option.option}
                    onChange={(e) =>
                      handleInputChange(e, questionIdx, optionIdx)
                    }
                    className="w-full bg-zinc-600 text-white p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                ))}
                <button
                  onClick={() => addOption(questionIdx)}
                  className="text-indigo-600 bg-white py-2 px-4 rounded-lg font-semibold mt-2 hover:underline"
                >
                  + Add Option
                </button>
              </div>
            ))}
            <div className="flex gap-4 mt-6">
              <button
                onClick={addQuestion}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Question
              </button>
              <button
                onClick={handleCreatePoll}
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Created Polls Section */}

      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white">My Created Polls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll, pollIdx) => (
            <Link
              to={`/polls/${poll._id}`}
              key={pollIdx}
              className="block bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {poll.title}
              </h4>
              <p className="text-gray-600">
                Created by: {poll.createdBy.username}
              </p>
              <p className="text-gray-600">
                Participants: {poll.participants.length}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(poll);
                  }}
                >
                  Stop Poll
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPolls;
