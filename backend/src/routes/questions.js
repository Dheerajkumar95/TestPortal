// routes/questions.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question.model.js");

router.post("/add", async (req, res) => {
  try {
    const { section, question, options, correct } = req.body;
    const newQ = new Question({ section, question, options, correct });
    await newQ.save();
    res.status(201).json({ message: "Question saved!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
