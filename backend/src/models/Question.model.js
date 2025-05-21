const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const questionSchema = new mongoose.Schema({
  id: Number,
  section: String,
  question: String,
  image: String,
  options: [optionSchema],
  correct: String,
});

module.exports = mongoose.model("Question", questionSchema);
