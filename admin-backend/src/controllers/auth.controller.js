const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils.js");
const NPasskey = require("../models/passkey.model.js");

const createpasskey = async (req, res) => {
  const { Passkey } = req.body;
  try {
    if (!Passkey) {
      return res.status(400).json({ message: "Passkey is required" });
    }
    const allPasskeys = await NPasskey.find();
    for (const item of allPasskeys) {
      const isMatch = await bcrypt.compare(Passkey, item.Passkey);
      if (isMatch) {
        return res.status(400).json({ message: "Passkey already exists" });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasskey = await bcrypt.hash(Passkey, salt);

    const newPasskey = new NPasskey({
      Passkey: hashedPasskey,
    });

    if (newPasskey) {
      generateToken(newPasskey._id, res);
      await newPasskey.save();

      res.status(201).json({
        _id: newPasskey._id,
        Passkey: newPasskey.Passkey,
        createdAt: newPasskey.createdAt,
      });
    } else {
      res.status(400).json({ message: "Invalid Passkey data" });
    }
  } catch (error) {
    console.log("Error in Passkey controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createpasskey,
};
