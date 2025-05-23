import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  pendingUser: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    }
  },
  passkey: async (formData, navigate) => {
    try {
      await axiosInstance.post("/auth/passkey", { Passkey: formData.Passkey });
      navigate("/instructions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Passkey");
    }
  },
  Verification: async (otp, formData, navigate) => {
    try {
      const res = await axiosInstance.post("/auth/verifyOtpAndRegister", {
        otp,
        user: formData,
      });
      set({ authUser: res.data, otpSentTo: null });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  },
  resendotp: async (email, fullName) => {
    try {
      await axiosInstance.post("/auth/resendotp", { email, fullName });
      console.log("OTP resent to:", email);
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  },
  login: async (formData, navigate) => {
    console.log("formData sent to backend:", formData);
    try {
      const res = await axiosInstance.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // ✅ allow cookies (JWT) to be sent/received
        }
      );
      set({ authUser: res.data });
      navigate("/wel");
    } catch (error) {
      console.log("Login error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Invalid Email and Password"
      );
    }
  },
  saveScore: async (updatedScore, totalQuestions) => {
    try {
      await axiosInstance.post(
        "/result/save",
        {
          score: updatedScore,
          total: totalQuestions,
        },
        { withCredentials: true }
      );
      toast.success("Score saved successfully!");
    } catch (error) {
      console.error(
        "Error saving score:",
        error.response?.data || error.message
      );
      toast.error("Failed to save score.");
    }
  },
}));
