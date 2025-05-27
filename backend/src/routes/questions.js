const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../lib/cloudinary.js");
const Question = require("../models/Question.model.js");

// Configure multer to store the image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      // Convert buffer to base64
      const base64Image = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(base64Image);
      imageUrl = uploadResponse.secure_url;
    }

    const { section, question, correct } = req.body;
    const options = JSON.parse(req.body.options);

    const newQ = new Question({
      section,
      question,
      image: imageUrl,
      options,
      correct,
    });

    await newQ.save();
    res.status(201).json({ message: "Question saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
