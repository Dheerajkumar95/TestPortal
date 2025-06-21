const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    Passkey: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

const NPasskey = mongoose.model("Passkey", userSchema);

module.exports = NPasskey;
