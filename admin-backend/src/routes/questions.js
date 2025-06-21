const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../lib/cloudinary.js");
const Question = require("../models/Question.model.js");
const XLSX = require("xlsx");
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

    const { section, batch, question, correct } = req.body;
    const options = JSON.parse(req.body.options);

    const newQ = new Question({
      section,
      batch, // 👈 new field added here
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
router.post("/upload-excel", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const questions = data.map((row) => ({
      section: row.section,
      batch: row.batch,
      question: row.question,
      options: [
        { id: "a", text: row.optionA },
        { id: "b", text: row.optionB },
        { id: "c", text: row.optionC },
        { id: "d", text: row.optionD },
      ],
      correct: row.correct,
      image: row.image || "",
    }));

    await Question.insertMany(questions);
    res.status(200).json({ message: "Questions uploaded successfully." });
  } catch (err) {
    console.error("Excel Upload Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
