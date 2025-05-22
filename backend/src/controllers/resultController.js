const Result = require("../models/result.model.js");
const saveResult = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.user._id; // ✅ not req.user.id if using Mongoose
    const { score, total } = req.body;

    if (score === undefined || total === undefined) {
      return res.status(400).json({ message: "Score and total are required" });
    }

    const newResult = new Result({ user: userId, score, total });
    await newResult.save();

    res
      .status(200)
      .json({ message: "Result saved successfully", result: newResult });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Failed to save result" });
  }
};

module.exports = { saveResult };
