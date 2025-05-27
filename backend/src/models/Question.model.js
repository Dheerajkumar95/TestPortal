const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  options: [
    {
      id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  correct: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
