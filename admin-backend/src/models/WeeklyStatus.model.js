const mongoose = require("mongoose");

const weeklySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  totalScore: { type: Number, default: 0 },
  totalAttempts: { type: Number, default: 0 },
});

module.exports = mongoose.model("WeeklyStatus", weeklySchema);
