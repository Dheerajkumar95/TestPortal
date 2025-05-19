const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  resetToken: String,
  resetTokenExpire: Date,
});

module.exports = mongoose.model("forgot", userSchema);
