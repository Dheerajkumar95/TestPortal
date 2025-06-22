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

    // Find the latest attempt
    const lastResult = await Result.findOne({ user: userId }).sort({
      attempt: -1,
    });
    const nextAttempt = lastResult ? lastResult.attempt + 1 : 1;

    // Create a new result
    const newResult = await Result.create({
      user: userId,
      score,
      total,
      attempt: nextAttempt,
    });

    res.status(201).json({
      message: "Result saved successfully",
      result: newResult,
    });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Failed to save result" });
  }
};

const saveSectionScore = async (req, res) => {
  const { section, score, total } = req.body;
  const userId = req.user.id;

  // Find latest attempt number
  const last = await SectionScore.findOne({ userId }).sort({ attempt: -1 });

  const nextAttempt = last ? last.attempt : 1;

  const newScore = new SectionScore({
    userId,
    sectionName: section,
    score,
    totalQuestions: total,
    attempt: nextAttempt,
  });

  await newScore.save();
  res
    .status(201)
    .json({ message: "Section score saved", attempt: nextAttempt });
};

const getUserSectionScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await SectionScore.find({ userId }).sort({ attempt: 1 });

    // Group scores by attempt
    const grouped = {};

    for (const score of scores) {
      const attempt = score.attempt;

      if (!grouped[attempt]) {
        grouped[attempt] = {
          attempt,
          sections: [],
        };
      }

      grouped[attempt].sections.push({
        sectionName: score.sectionName,
        score: score.score,
        totalQuestions: score.totalQuestions,
      });
    }

    // Convert object to array
    const result = Object.values(grouped);

    res.json(result);
  } catch (error) {
    console.error("Section score fetch error:", error);
    res.status(500).json({ message: "Error fetching section scores" });
  }
};

module.exports = { saveResult, saveSectionScore, getUserSectionScores };
