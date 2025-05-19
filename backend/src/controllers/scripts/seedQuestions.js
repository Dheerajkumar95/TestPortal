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
        question:
          "Which method is used to add an element to the end of an array in JavaScript?",
        image:
          "https://t4.ftcdn.net/jpg/00/14/31/21/360_F_14312160_noHLLbfSMsCzvckeNrMaI4KwPgkWxYqb.jpg",
        options: [
          { id: "a", text: "push()" },
          { id: "b", text: "pop()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" },
        ],
        correct: "a",
      },
      {
        id: 2,
        question: "What does the 'this' keyword refer to in JavaScript?",
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20231004100648/Q1.png",
        options: [
          { id: "a", text: "The global object" },
          { id: "b", text: "The current function" },
          { id: "c", text: "The object calling the function" },
          { id: "d", text: "None of the above" },
        ],
        correct: "c",
      },
      {
        id: 3,
        question: "Which property is used in CSS to change text color?",
        options: [
          { id: "a", text: "font-color" },
          { id: "b", text: "text-color" },
          { id: "c", text: "color" },
          { id: "d", text: "background-color" },
        ],
        correct: "c",
      },
      {
        id: 4,
        question: "Which HTML element is used to define a hyperlink?",
        options: [
          { id: "a", text: "<link>" },
          { id: "b", text: "<a>" },
          { id: "c", text: "<href>" },
          { id: "d", text: "<url>" },
        ],
        correct: "b",
      },
      {
        id: 5,
        question: "Which CSS property controls the font size?",
        options: [
          { id: "a", text: "font-size" },
          { id: "b", text: "text-size" },
          { id: "c", text: "font-style" },
          { id: "d", text: "text-font" },
        ],
        correct: "a",
      },
      {
        id: 6,
        question: "What is the purpose of the 'box-sizing' property in CSS?",
        options: [
          { id: "a", text: "To specify the border model" },
          { id: "b", text: "To set the layout model of an element" },
          { id: "c", text: "To adjust the padding size" },
          { id: "d", text: "To control the box model behavior" },
        ],
        correct: "d",
      },
      {
        id: 7,
        question:
          "Which JavaScript method is used to return the type of a variable?",
        options: [
          { id: "a", text: "typeof()" },
          { id: "b", text: "type()" },
          { id: "c", text: "instanceof()" },
          { id: "d", text: "objectType()" },
        ],
        correct: "a",
      },
      {
        id: 8,
        question: "What does the 'z-index' property in CSS control?",
        options: [
          { id: "a", text: "The stacking order of elements" },
          { id: "b", text: "The visibility of elements" },
          { id: "c", text: "The size of an element" },
          { id: "d", text: "The alignment of elements" },
        ],
        correct: "a",
      },
      {
        id: 9,
        question:
          "Which method is used to remove the last element from an array in JavaScript?",
        options: [
          { id: "a", text: "pop()" },
          { id: "b", text: "push()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" },
        ],
        correct: "a",
      },
      {
        id: 10,
        question:
          "What is the default value of the 'position' property in CSS?",
        options: [
          { id: "a", text: "relative" },
          { id: "b", text: "static" },
          { id: "c", text: "absolute" },
          { id: "d", text: "fixed" },
        ],
        correct: "b",
      },
      {
        id: 11,
        question:
          "Which CSS property is used to control the spacing between words?",
        options: [
          { id: "a", text: "word-spacing" },
          { id: "b", text: "letter-spacing" },
          { id: "c", text: "text-spacing" },
          { id: "d", text: "line-height" },
        ],
        correct: "a",
      },
      {
        id: 12,
        question:
          "Which method is used to convert a string into an integer in JavaScript?",
        options: [
          { id: "a", text: "parseInt()" },
          { id: "b", text: "toInteger()" },
          { id: "c", text: "parseFloat()" },
          { id: "d", text: "toString()" },
        ],
        correct: "a",
      },
      {
        id: 13,
        question:
          "Which event is triggered when a user clicks on an HTML element?",
        options: [
          { id: "a", text: "onclick" },
          { id: "b", text: "onhover" },
          { id: "c", text: "onfocus" },
          { id: "d", text: "onblur" },
        ],
        correct: "a",
      },
      {
        id: 14,
        question:
          "What is the correct HTML element for inserting a line break?",
        options: [
          { id: "a", text: "<lb>" },
          { id: "b", text: "<break>" },
          { id: "c", text: "<br>" },
          { id: "d", text: "<hr>" },
        ],
        correct: "c",
      },
      {
        id: 15,
        question:
          "Which CSS property is used to change the background color of an element?",
        options: [
          { id: "a", text: "background-color" },
          { id: "b", text: "background" },
          { id: "c", text: "color" },
          { id: "d", text: "fill" },
        ],
        correct: "a",
      },
      {
        id: 16,
        question: "What is the result of the expression 2 + '2' in JavaScript?",
        options: [
          { id: "a", text: "4" },
          { id: "b", text: "22" },
          { id: "c", text: "NaN" },
          { id: "d", text: "undefined" },
        ],
        correct: "b",
      },
      {
        id: 17,
        question: "Which CSS property is used to make text bold?",
        options: [
          { id: "a", text: "font-weight" },
          { id: "b", text: "font-style" },
          { id: "c", text: "font-size" },
          { id: "d", text: "text-decoration" },
        ],
        correct: "a",
      },
      {
        id: 18,
        question: "What does the 'null' value represent in JavaScript?",
        options: [
          { id: "a", text: "An empty object" },
          { id: "b", text: "A null value" },
          { id: "c", text: "An empty string" },
          { id: "d", text: "An undefined variable" },
        ],
        correct: "b",
      },
      {
        id: 19,
        question: "What is the purpose of the 'display: none' style in CSS?",
        options: [
          { id: "a", text: "To hide an element" },
          {
            id: "b",
            text: "To make an element invisible but still take up space",
          },
          { id: "c", text: "To hide an element without affecting the layout" },
          { id: "d", text: "To remove an element from the DOM" },
        ],
        correct: "a",
      },
      {
        id: 20,
        question: "Which CSS property is used to change the font of text?",
        options: [
          { id: "a", text: "font-family" },
          { id: "b", text: "font-size" },
          { id: "c", text: "font-style" },
          { id: "d", text: "text-font" },
        ],
        correct: "a",
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
