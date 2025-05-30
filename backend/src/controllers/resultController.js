const Result = require("../models/result.model.js");
const SectionScore = require("../models/SectionScore.model.js");
const saveResult = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.user._id;
    const { score, total } = req.body;

    if (score === undefined || total === undefined) {
      return res.status(400).json({ message: "Score and total are required" });
    }

    const updatedResult = await Result.findOneAndUpdate(
      { user: userId },
      { score, total },
      { new: true }
    );

    res.status(200).json({
      message: "Result saved successfully",
      result: updatedResult,
    });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Failed to save result" });
  }
};

const saveScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { section, score, total } = req.body;

    await SectionScore.create({
      userId: userId,
      sectionName: section,
      score: score,
      totalQuestions: total,
    });

    res.status(200).json();
  } catch (err) {
    console.error("Score save error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getUserSectionScores = async (req, res) => {
  try {
    const userId = req.user.id;
    const scores = await SectionScore.find({ userId });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching section scores" });
  }
};

module.exports = { saveResult, saveScore, getUserSectionScores };
