const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    batch: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    // ✅ Newly added fields
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    tenthMarks: {
      type: String,
      required: true,
    },
    tenthYearOfPassing: {
      type: String,
      required: true,
    },
    twelfthMarks: {
      type: String,
      required: true,
    },
    twelfthYearOfPassing: {
      type: String,
      required: true,
    },
    cgpa: {
      sem1: { type: String },
      sem2: { type: String },
      sem3: { type: String },
      sem4: { type: String },
      sem5: { type: String },
      sem6: { type: String },
      sem7: { type: String },
      sem8: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
