import mongoose from "mongoose";
const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
      result: {
        type: String,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      optionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Poll = mongoose.model("Poll", pollSchema);
