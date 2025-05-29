const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const Result = require("../models/result.model");

router.get("/rank", protect, async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const allResults = await Result.find().sort({ score: -1 });

    const userResult = allResults.find(
      (result) => result.user.toString() === userId
    );

    if (!userResult) {
      return res.status(404).json({ message: "Result not found for user" });
    }

    const rank =
      allResults.findIndex((result) => result.user.toString() === userId) + 1;

    res.json({
      rank,
    });
  } catch (error) {
    console.error("Rank fetching error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
