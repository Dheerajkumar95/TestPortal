const mongoose = require("mongoose");

const weeklyStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("WeeklyStatus", weeklyStatsSchema);
