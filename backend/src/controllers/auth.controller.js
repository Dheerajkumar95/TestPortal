const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils.js");
const User = require("../models/user.model.js");
const NPasskey = require("../models/passkey.model.js");
const Otp = require("../models/otp.model.js");
const nodemailer = require("nodemailer");
const {
  sendVerificationEamil,
  senWelcomeEmail,
} = require("../middleware/Email.js");
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
const passkey = async (req, res) => {
  const { Passkey } = req.body;

  try {
    if (!Passkey) {
      return res.status(400).json({ message: "Passkey is required" });
    }

    const checkPasskey = await NPasskey.findOne(); // You can filter here if needed

    if (!checkPasskey) {
      return res.status(404).json({ message: "No passkey found in database" });
    }

    const isMatch = await bcrypt.compare(Passkey, checkPasskey.Passkey);

    if (isMatch) {
      return res.status(200).json({ message: "Passkey verified successfully" });
    } else {
      return res.status(401).json({ message: "Invalid Passkey" });
    }
  } catch (error) {
    console.log("Error in Passkey controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const sendotp = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;
  console.log("Email received:", email);

  // 1. Check if already registered
  const uexists = await User.findOne({ email });
  if (uexists) return res.status(400).json({ message: "User already exists" });
  const exists = await Otp.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  // 2. Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // 3. Save OTP in temp DB or in-memory storage
  await Otp.create({
    email,
    otp,
    expiresAt: Date.now() + 300000,
  });

  // 4. Send OTP (e.g. via email/SMS)
  await sendVerificationEamil(email, otp, fullName);
  console.log("Email received:", email);
  return res.status(200).json({ message: "OTP sent successfully" });
};

const verifyOtpAndRegister = async (req, res) => {
  const { otp, user } = req.body;
  const { fullName, email, contact, password, confirmPassword } = user;
  console.log("Received body:", req.body);
  try {
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Find the OTP record
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

    // 3. Check if OTP expired
    if (otpRecord.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // 4. Check if OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    // 6. Create user
    const newUser = await User.create({
      fullName,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });
    await senWelcomeEmail(email, fullName);
    // 7. Clean up used OTP
    await Otp.deleteOne({ email });

    // 8. Return success response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const resendotp = async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendVerificationEamil(email, otp, fullName);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Generate token (assuming this sets it in a cookie)
    generateToken(user._id, res);

    // Send user info back
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const questions = (req, res) => {
  const data = [
    {
      id: 1,
      question:
        "Which method is used to add an element to the end of an array in JavaScript?",
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
      question: "What is the default value of the 'position' property in CSS?",
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
      question: "What is the correct HTML element for inserting a line break?",
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
  res.status(200).json(data);
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  logout,
  updateProfile,
  checkAuth,
  createpasskey,
  passkey,
  sendotp,
  resendotp,
  verifyOtpAndRegister,
  questions,
};
