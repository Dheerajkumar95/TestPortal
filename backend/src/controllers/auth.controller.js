const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary.js");
const { generateToken } = require("../lib/utils.js");
const User = require("../models/user.model.js");
const NPasskey = require("../models/passkey.model.js");
const Otp = require("../models/otp.model.js");
const Result = require("../models/result.model.js");
const forgot = require("../models/forgot.model.js");
const Question = require("../models/Question.model.js");

const {
  sendVerificationEamil,
  senWelcomeEmail,
  ResetPasswordEmail,
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
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
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
  try {
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

    if (otpRecord.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const newUser = await User.create({
      fullName,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });
    await senWelcomeEmail(email, fullName);

    await Otp.deleteOne({ email });

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
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate and set cookie
    generateToken(user._id, res);
    console.log(generateToken);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const profile = async (req, res) => {
  try {
    res.json(req.user); // just return the req.user set by middleware
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Convert image to base64
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: base64Image },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email not registered." });

    const token = await bcrypt.hash(email, 10);
    console.log("Generated token:", token);

    const resetToken = token;
    const resetTokenExpire = Date.now() + 15 * 60 * 1000;

    // Check if a reset request already exists for this email
    let existingRequest = await forgot.findOne({ email });

    if (existingRequest) {
      // Update existing token and expiry
      existingRequest.resetToken = resetToken;
      existingRequest.resetTokenExpire = resetTokenExpire;
      await existingRequest.save();
    } else {
      // Create a new reset record
      existingRequest = await forgot.create({
        email,
        resetToken,
        resetTokenExpire,
      });
    }

    const link = `http://localhost:5173/reset-password/${encodeURIComponent(
      token
    )}`;
    console.log("Reset link:", link);

    await ResetPasswordEmail(email, link);

    return res.status(201).json({
      message: "Reset link sent to your email.",
      data: {
        _id: existingRequest._id,
        email: existingRequest.email,
        resetToken: existingRequest.resetToken,
        resetTokenExpire: existingRequest.resetTokenExpire,
      },
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenDoc = await forgot.findOne({ resetToken: token });

    if (!tokenDoc || tokenDoc.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Token is invalid or expired." });
    }

    res.status(200).json({ message: "Token verified. Set your new password." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const tokenDoc = await forgot.findOne({ resetToken: token });

    if (!tokenDoc || tokenDoc.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or Link expired." });
    }

    const user = await User.findOne({ email: tokenDoc.email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await forgot.deleteOne({ _id: tokenDoc._id });

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const questions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
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
// controllers/quizController.js

const saveResult = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, total } = req.body;

    if (score === undefined || total === undefined) {
      return res.status(400).json({ message: "Score and total are required" });
    }

    const newResult = new Result({
      user: userId,
      score,
      total,
    });

    await newResult.save();

    res
      .status(200)
      .json({ message: "Result saved successfully", result: newResult });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Failed to save result" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profileImage } = req.body;
    const userId = req.user._id;

    if (!profileImage) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    console.log("hey");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: uploadResponse.secure_url },
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
  profile,
  updateProfileImage,
  logout,
  checkAuth,
  updateProfile,
  createpasskey,
  passkey,
  sendotp,
  resendotp,
  verifyOtpAndRegister,
  questions,
  forgotPassword,
  verifyToken,
  resetPassword,
  saveResult,
};
