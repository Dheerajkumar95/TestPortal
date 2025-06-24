const express = require("express");
const User = require("../models/User.model.js");
const WeeklyStatus = require("../models/WeeklyStatus.model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const { batch } = req.query;
  try {
    // 1. Get users from User model
    const users = await User.find(batch ? { batch } : {})
      .select("fullName email batch contact rollNumber branch") // ✅ Added fields
      .lean();

    // 2. Get WeeklyStatus for those users
    const userIds = users.map((u) => u._id);
    const stats = await WeeklyStatus.find({ user: { $in: userIds } })
      .select("user totalScore totalAttempts")
      .lean();

    // 3. Map scores to users
    const statsMap = Object.fromEntries(
      stats.map((s) => [s.user.toString(), s])
    );

    // 4. Final response
    const result = users.map((u) => ({
      id: u._id,
      name: u.fullName,
      email: u.email,
      batch: u.batch,
      contact: u.contact,
      rollNumber: u.rollNumber,
      branch: u.branch,
      totalScore: statsMap[u._id.toString()]?.totalScore || 0,
      totalAttempts: statsMap[u._id.toString()]?.totalAttempts || 0,
    }));

    res.json(result);
  } catch (err) {
    console.error("Admin user fetch failed:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
