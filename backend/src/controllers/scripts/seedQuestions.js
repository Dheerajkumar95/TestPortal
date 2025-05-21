require("dotenv").config(); // if using .env
const mongoose = require("mongoose");
const Question = require("../../models/Question.model.js");

mongoose
  .connect(
    "mongodb+srv://dheerajk35973:FotHrcIyN3kuATwp@cluster0.wcpxfmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    console.log("Connected to MongoDB");

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

      {
        id: 6,
        section: "Front-End Logic",
        question: "What does JSX stand for?",
        options: [
          { id: "a", text: "JavaScript XML" },
          { id: "b", text: "Java Syntax Extension" },
          { id: "c", text: "JSON XML" },
          { id: "d", text: "Java Simple XML" },
        ],
        correct: "a",
      },
      {
        id: 7,
        section: "Front-End Logic",
        question: "Which hook is used to manage state in React?",
        options: [
          { id: "a", text: "useRef" },
          { id: "b", text: "useState" },
          { id: "c", text: "useEffect" },
          { id: "d", text: "useMemo" },
        ],
        correct: "b",
      },
      {
        id: 8,
        section: "Front-End Logic",
        question:
          "How do you pass data from parent to child component in React?",
        options: [
          { id: "a", text: "Props" },
          { id: "b", text: "State" },
          { id: "c", text: "Context" },
          { id: "d", text: "useEffect" },
        ],
        correct: "a",
      },
      {
        id: 9,
        section: "Front-End Logic",
        question: "What is the default port for React development server?",
        options: [
          { id: "a", text: "8000" },
          { id: "b", text: "3000" },
          { id: "c", text: "5000" },
          { id: "d", text: "8080" },
        ],
        correct: "b",
      },
      {
        id: 10,
        section: "Front-End Logic",
        question:
          "Which lifecycle method is used to fetch data after the component mounts in class-based components?",
        options: [
          { id: "a", text: "componentDidMount" },
          { id: "b", text: "componentWillUnmount" },
          { id: "c", text: "render" },
          { id: "d", text: "constructor" },
        ],
        correct: "a",
      },

      {
        id: 11,
        section: "Back-End Logic",
        question: "Which of the following is a Node.js framework?",
        options: [
          { id: "a", text: "Laravel" },
          { id: "b", text: "Django" },
          { id: "c", text: "Express" },
          { id: "d", text: "Spring" },
        ],
        correct: "c",
      },
      {
        id: 12,
        section: "Back-End Logic",
        question: "Which HTTP method is used to update a resource?",
        options: [
          { id: "a", text: "GET" },
          { id: "b", text: "POST" },
          { id: "c", text: "PUT" },
          { id: "d", text: "DELETE" },
        ],
        correct: "c",
      },
      {
        id: 13,
        section: "Back-End Logic",
        question: "What does REST stand for?",
        options: [
          { id: "a", text: "Representational State Transfer" },
          { id: "b", text: "Remote Execution Stack Transfer" },
          { id: "c", text: "Random Event State Transmission" },
          { id: "d", text: "Real-time Secure Transfer" },
        ],
        correct: "a",
      },
      {
        id: 14,
        section: "Back-End Logic",
        question: "Which status code means 'Not Found'?",
        options: [
          { id: "a", text: "500" },
          { id: "b", text: "403" },
          { id: "c", text: "404" },
          { id: "d", text: "401" },
        ],
        correct: "c",
      },
      {
        id: 15,
        section: "Back-End Logic",
        question:
          "What is the default file name for starting an Express server?",
        options: [
          { id: "a", text: "index.js" },
          { id: "b", text: "app.js" },
          { id: "c", text: "server.js" },
          { id: "d", text: "start.js" },
        ],
        correct: "b",
      },

      {
        id: 16,
        section: "Database",
        question: "Which of the following is a NoSQL database?",
        options: [
          { id: "a", text: "MySQL" },
          { id: "b", text: "PostgreSQL" },
          { id: "c", text: "MongoDB" },
          { id: "d", text: "Oracle" },
        ],
        correct: "c",
      },
      {
        id: 17,
        section: "Database",
        question: "Which command is used to retrieve data from a SQL database?",
        options: [
          { id: "a", text: "GET" },
          { id: "b", text: "SELECT" },
          { id: "c", text: "PULL" },
          { id: "d", text: "FETCH" },
        ],
        correct: "b",
      },
      {
        id: 18,
        section: "Database",
        question: "What does CRUD stand for?",
        options: [
          { id: "a", text: "Create, Read, Update, Delete" },
          { id: "b", text: "Copy, Run, Undo, Deploy" },
          { id: "c", text: "Create, Run, Update, Drop" },
          { id: "d", text: "Connect, Read, Upload, Drop" },
        ],
        correct: "a",
      },
      {
        id: 19,
        section: "Database",
        question: "Which MongoDB method is used to insert a document?",
        options: [
          { id: "a", text: "addOne()" },
          { id: "b", text: "insert()" },
          { id: "c", text: "insertOne()" },
          { id: "d", text: "push()" },
        ],
        correct: "c",
      },
      {
        id: 20,
        section: "Database",
        question: "Which keyword is used in SQL to remove duplicate values?",
        options: [
          { id: "a", text: "REMOVE DUPLICATE" },
          { id: "b", text: "DISTINCT" },
          { id: "c", text: "UNIQUE" },
          { id: "d", text: "DELETE DISTINCT" },
        ],
        correct: "b",
      },

      {
        id: 21,
        section: "General Computer Knowledge",
        question: "Which of the following is an input device?",
        options: [
          { id: "a", text: "Monitor" },
          { id: "b", text: "Mouse" },
          { id: "c", text: "Printer" },
          { id: "d", text: "Speaker" },
        ],
        correct: "b",
      },
      {
        id: 22,
        section: "General Computer Knowledge",
        question: "Which company developed the Windows operating system?",
        options: [
          { id: "a", text: "Google" },
          { id: "b", text: "Microsoft" },
          { id: "c", text: "Apple" },
          { id: "d", text: "IBM" },
        ],
        correct: "b",
      },
      {
        id: 23,
        section: "General Computer Knowledge",
        question: "What does CPU stand for?",
        options: [
          { id: "a", text: "Central Processing Unit" },
          { id: "b", text: "Computer Processing Unit" },
          { id: "c", text: "Central Power Unit" },
          { id: "d", text: "Control Processing Unit" },
        ],
        correct: "a",
      },
      {
        id: 24,
        section: "General Computer Knowledge",
        question: "Which of these is a type of non-volatile memory?",
        options: [
          { id: "a", text: "RAM" },
          { id: "b", text: "ROM" },
          { id: "c", text: "Cache" },
          { id: "d", text: "Register" },
        ],
        correct: "b",
      },
      {
        id: 25,
        section: "General Computer Knowledge",
        question: "Which unit is used to measure data size?",
        options: [
          { id: "a", text: "Kilogram" },
          { id: "b", text: "Hertz" },
          { id: "c", text: "Watt" },
          { id: "d", text: "Byte" },
        ],
        correct: "d",
      },
    ];

    try {
      await Question.deleteMany({});
      await Question.insertMany(sampleQuestions);
      console.log("Questions seeded successfully.");
      process.exit(); // Exit script
    } catch (err) {
      console.error("Error seeding questions:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
