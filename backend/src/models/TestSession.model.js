const mongoose = require("mongoose");

const testSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    testDate: { type: Date, required: true },
  },
  { timestamps: true }
);

testSessionSchema.index({ user: 1, testDate: 1 }, { unique: true });

module.exports = mongoose.model("TestSession", testSessionSchema);
