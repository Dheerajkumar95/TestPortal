const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary.js");
const { generateToken } = require("../lib/utils.js");
const User = require("../models/user.model.js");
const NPasskey = require("../models/passkey.model.js");
const Otp = require("../models/otp.model.js");
const forgot = require("../models/forgot.model.js");
const Question = require("../models/Question.model.js");
const Result = require("../models/result.model.js");
const moment = require("moment-timezone");

const {
  sendVerificationEamil,
  senWelcomeEmail,
  ResetPasswordEmail,
} = require("../middleware/Email.js");

const passkey = async (req, res) => {
  try {
    const { Passkey } = req.body;
    const score = 0;
    const total = 0;
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const nowIST = moment().tz("Asia/Kolkata");

    const dayOfWeek = nowIST.day();
    if (dayOfWeek !== 0) {
      return res.status(403).json({
        message: "Test is only allowed on Sundays.",
      });
    }

    const hour = nowIST.hour();
    const minute = nowIST.minute();
    const totalMinutes = hour * 60 + minute;

    if (totalMinutes < 600 || totalMinutes >= 840) {
      return res.status(403).json({
        message: "Test is allowed only between 10:00 AM and 2:00 PM IST.",
      });
    }

    const sundayStart = nowIST.clone().startOf("day").toDate();
    const sundayEnd = nowIST.clone().endOf("day").toDate();

    const alreadyAttempted = await Result.findOne({
      user: userId,
      createdAt: { $gte: sundayStart, $lte: sundayEnd },
    });

    if (alreadyAttempted) {
      return res.status(403).json({
        message: "You have already attempted the test this Sunday.",
      });
    }

    const allPasskeys = await NPasskey.find();
    for (const item of allPasskeys) {
      const isMatch = await bcrypt.compare(Passkey, item.Passkey);
      if (isMatch) {
        await Result.create({ user: userId, score, total });
        return res.status(200).json({
          message: "Passkey verified. You may begin your test.",
        });
      }
    }

    return res.status(401).json({ message: "Invalid Passkey" });
  } catch (error) {
    console.error("Passkey Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendotp = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;
  console.log("Email received:", email);

  const uexists = await User.findOne({ email });
  if (uexists) {
    return res.status(400).json({ message: "User already exists" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  const existingOtp = await Otp.findOne({ email });

  if (existingOtp) {
    existingOtp.otp = otp;
    existingOtp.expiresAt = expiresAt;
    await existingOtp.save();
    console.log("OTP updated for existing email:", email);
  } else {
    await Otp.create({
      email,
      otp,
      expiresAt,
    });
    console.log("New OTP created for email:", email);
  }

  // 5. Send OTP via email
  await sendVerificationEamil(email, otp, fullName);

  return res.status(200).json({ message: "OTP sent successfully" });
};

const verifyOtpAndRegister = async (req, res) => {
  const { otp, user } = req.body;
  const {
    fullName,
    email,
    contact,
    rollNumber,
    batch,
    branch,
    password,
    confirmPassword,
  } = user;
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
      rollNumber,
      batch,
      branch,
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
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const fullName = user.fullName; // or user.name based on your schema
    console.log(email);

    const token = await bcrypt.hash(email, 10);
    console.log("Generated token:", token);

    const resetToken = token;
    const resetTokenExpire = Date.now() + 5 * 60 * 1000;

    let existingRequest = await forgot.findOne({ email });

    if (existingRequest) {
      existingRequest.resetToken = resetToken;
      existingRequest.resetTokenExpire = resetTokenExpire;
      await existingRequest.save();
    } else {
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

    await ResetPasswordEmail(email, fullName, link);

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
    const userBatch = req.user.batch;
    if (!userBatch) {
      return res.status(400).json({ error: "Batch not found in user token" });
    }

    const questions = await Question.find({ batch: userBatch });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching batch-wise questions:", error);
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
const updateProfile = async (req, res) => {
  try {
    const { profileImage } = req.body;
    const userId = req.user._id;

    if (!profileImage) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profileImage);

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
  logout,
  checkAuth,
  updateProfile,
  passkey,
  sendotp,
  resendotp,
  verifyOtpAndRegister,
  questions,
  forgotPassword,
  verifyToken,
  resetPassword,
};
