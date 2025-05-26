// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  section: String,
  question: String,
  options: [
    {
      id: String,
      text: String,
    },
  ],
  correct: String,
});

module.exports = mongoose.model("Question", questionSchema);
