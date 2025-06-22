const Result = require("../models/result.model.js");
const SectionScore = require("../models/SectionScore.model.js");
const User = require("../models/user.model.js");
const moment = require("moment-timezone");
const saveResult = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { score, total } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (score === undefined || total === undefined) {
      return res.status(400).json({ message: "Score and total are required" });
    }

    const nowIST = moment().tz("Asia/Kolkata");
    const sundayDate = nowIST.clone().startOf("day").toDate();

    // Prevent multiple result saves for same Sunday
    const existingResult = await Result.findOne({ user: userId, sundayDate });
    if (existingResult) {
      return res.status(409).json({
        message: "You have already submitted your test result this Sunday.",
      });
    }

    const totalAttempts = await Result.countDocuments({ user: userId });

    const newResult = await Result.create({
      user: userId,
      score,
      total,
      attempt: totalAttempts + 1,
      sundayDate,
    });

    // Optional: Update totalScore in User model
    await User.findByIdAndUpdate(userId, {
      $inc: { totalScore: score },
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
