require("dotenv").config(); // optional if using .env
const mongoose = require("mongoose");
const Question = require("../../models/Question.model.js");

mongoose
  .connect(
    "mongodb+srv://dheerajk35973:FotHrcIyN3kuATwp@cluster0.wcpxfmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const sampleQuestions = [
      {
        id: 1,
        section: "Basic Programming",
        question: "What is React?",
        options: [
          { id: "a", text: "Library" },
          { id: "b", text: "Framework" },
          { id: "c", text: "Language" },
          { id: "d", text: "Tool" },
        ],
        correct: "a",
      },
      {
        id: 2,
        section: "Basic Programming",
        question:
          "Which of the following is used to declare a variable in JavaScript?",
        options: [
          { id: "a", text: "int" },
          { id: "b", text: "let" },
          { id: "c", text: "var" },
          { id: "d", text: "Both b and c" },
        ],
        correct: "d",
      },
      {
        id: 3,
        section: "Basic Programming",
        question: "Which operator is used for assignment in JavaScript?",
        options: [
          { id: "a", text: "=" },
          { id: "b", text: "==" },
          { id: "c", text: "===" },
          { id: "d", text: ":=" },
        ],
        correct: "a",
      },
      {
        id: 4,
        section: "Basic Programming",
        question: "What is the output of typeof null in JavaScript?",
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "number" },
        ],
        correct: "b",
      },
      {
        id: 5,
        section: "Basic Programming",
        question: "Which of these is not a primitive data type in JavaScript?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Boolean" },
          { id: "c", text: "Object" },
          { id: "d", text: "Number" },
        ],
        correct: "c",
      },
    ];

    const verbalAndReasoningQuestions = [
      {
        id: 1,
        section: "Verbal and Reasoning",
        question:
          "Choose the word that is most nearly the same in meaning to 'Rapid'.",
        options: [
          { id: "a", text: "Slow" },
          { id: "b", text: "Swift" },
          { id: "c", text: "Calm" },
          { id: "d", text: "Weak" },
        ],
        correct: "b",
      },
      {
        id: 2,
        section: "Verbal and Reasoning",
        question:
          "Complete the analogy: Book is to Reading as Fork is to ____?",
        options: [
          { id: "a", text: "Drawing" },
          { id: "b", text: "Stirring" },
          { id: "c", text: "Writing" },
          { id: "d", text: "Eating" },
        ],
        correct: "d",
      },
      {
        id: 3,
        section: "Verbal and Reasoning",
        question: "Which word does NOT belong to the group?",
        options: [
          { id: "a", text: "Apple" },
          { id: "b", text: "Banana" },
          { id: "c", text: "Carrot" },
          { id: "d", text: "Mango" },
        ],
        correct: "c",
      },
      {
        id: 4,
        section: "Verbal and Reasoning",
        question:
          "Rearrange the following to form a meaningful sentence: 'Always / punctual / he / is'",
        options: [
          { id: "a", text: "He is punctual always" },
          { id: "b", text: "Always he is punctual" },
          { id: "c", text: "He always is punctual" },
          { id: "d", text: "He is always punctual" },
        ],
        correct: "d",
      },
      {
        id: 5,
        section: "Verbal and Reasoning",
        question: "Find the missing number in the series: 2, 4, 8, 16, __?",
        options: [
          { id: "a", text: "18" },
          { id: "b", text: "20" },
          { id: "c", text: "24" },
          { id: "d", text: "32" },
        ],
        correct: "d",
      },
    ];

    const generalAptitudeQuestions = [
      {
        id: 1,
        section: "General Aptitude",
        question:
          "If a train travels 60 km in 1.5 hours, what is its average speed?",
        options: [
          { id: "a", text: "30 km/h" },
          { id: "b", text: "40 km/h" },
          { id: "c", text: "50 km/h" },
          { id: "d", text: "60 km/h" },
        ],
        correct: "b",
      },
      {
        id: 2,
        section: "General Aptitude",
        question:
          "A man bought a watch for ₹800 and sold it for ₹1000. What is his profit percentage?",
        options: [
          { id: "a", text: "20%" },
          { id: "b", text: "25%" },
          { id: "c", text: "30%" },
          { id: "d", text: "15%" },
        ],
        correct: "b",
      },
      {
        id: 3,
        section: "General Aptitude",
        question: "What is the next number in the series: 3, 6, 11, 18, __?",
        options: [
          { id: "a", text: "25" },
          { id: "b", text: "27" },
          { id: "c", text: "26" },
          { id: "d", text: "30" },
        ],
        correct: "c",
      },
      {
        id: 4,
        section: "General Aptitude",
        question: "What is 15% of 200?",
        options: [
          { id: "a", text: "25" },
          { id: "b", text: "30" },
          { id: "c", text: "35" },
          { id: "d", text: "40" },
        ],
        correct: "b",
      },
      {
        id: 5,
        section: "General Aptitude",
        question: "If 5x = 20, what is the value of x?",
        options: [
          { id: "a", text: "2" },
          { id: "b", text: "3" },
          { id: "c", text: "4" },
          { id: "d", text: "5" },
        ],
        correct: "c",
      },
    ];

    try {
      await Question.deleteMany({});
      await Question.insertMany([
        ...sampleQuestions,
        ...verbalAndReasoningQuestions,
        ...generalAptitudeQuestions,
      ]);
      console.log("Questions seeded successfully.");
      process.exit();
    } catch (err) {
      console.error("Error seeding questions:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
