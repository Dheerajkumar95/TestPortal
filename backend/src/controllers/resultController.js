const Result = require("../models/result.model.js");
const SectionScore = require("../models/SectionScore.model.js");
const WeeklyStatus = require("../models/WeeklyStatus.model.js");
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

    // ✅ Check if already submitted this Sunday
    const existingResult = await Result.findOne({ user: userId, sundayDate });
    if (existingResult) {
      return res.status(409).json({
        message: "You have already submitted your test result this Sunday.",
      });
    }

    const totalAttempts = await Result.countDocuments({ user: userId });

    // ✅ Save current result
    const newResult = await Result.create({
      user: userId,
      score,
      total,
      attempt: totalAttempts + 1,
      sundayDate,
    });

    // ✅ Update user's overall totalScore (optional)
    await User.findByIdAndUpdate(userId, {
      $inc: { totalScore: score },
    });

    // ✅ Get previous Sunday score
    const previousSunday = moment(sundayDate)
      .subtract(7, "days")
      .startOf("day")
      .toDate();

    const previousResult = await Result.findOne({
      user: userId,
      sundayDate: previousSunday,
    });

    const previousScore = previousResult?.score || 0;
    const totalScore = score + previousScore;

    // ✅ Save total score and attempt count to WeeklyStatus
    await WeeklyStatus.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        totalScore,
        totalAttempts: totalAttempts + 1, // 🟢 Save attempt count
      },
      { upsert: true, new: true }
    );

    // ✅ Final response
    res.status(201).json({
      message: "Result & WeeklyStatus saved successfully",
      result: newResult,
      totalScore,
      totalAttempts: totalAttempts + 1,
    });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Failed to save result" });
  }
};

const saveSectionScore = async (req, res) => {
  try {
    const { section, score, total } = req.body;
    const userId = req.user.id;

    if (!section || score === undefined || total === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allSections = ["Aptitude", "Verbal and Reasoning", "Programming"]; // 👈 Update this list if needed

    // 🔍 Find last attempt
    const last = await SectionScore.findOne({ userId }).sort({ attempt: -1 });
    let currentAttempt = 1;

    if (last) {
      const lastAttempt = last.attempt;

      // Fetch how many sections are already saved in that attempt
      const previousSections = await SectionScore.find({
        userId,
        attempt: lastAttempt,
      });
      const submittedSectionNames = previousSections.map((s) => s.sectionName);

      // ✅ If all sections submitted, then start new attempt
      if (allSections.every((sec) => submittedSectionNames.includes(sec))) {
        currentAttempt = lastAttempt + 1;
      } else {
        // 🟡 Still in same test attempt
        currentAttempt = lastAttempt;
      }
    }

    // 🚫 Prevent duplicate section entry in same attempt
    const alreadySubmitted = await SectionScore.findOne({
      userId,
      sectionName: section,
      attempt: currentAttempt,
    });

    if (alreadySubmitted) {
      return res
        .status(400)
        .json({ message: "This section already submitted in this attempt" });
    }

    // ✅ Save section score
    const newScore = new SectionScore({
      userId,
      sectionName: section,
      score,
      totalQuestions: total,
      attempt: currentAttempt,
    });

    await newScore.save();

    res.status(201).json({
      message: "Section score saved successfully",
      attempt: currentAttempt,
    });
  } catch (error) {
    console.error("Error saving section score:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
