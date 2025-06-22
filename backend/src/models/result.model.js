const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    sundayDate: {
      type: Date,
      required: true, // ye ensure karega ki har test ek Sunday se linked ho
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one result per user per Sunday
resultSchema.index({ user: 1, sundayDate: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema);
