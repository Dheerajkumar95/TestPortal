import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  pendingUser: null,
  passkey: async (formData, navigate) => {
    try {
      await axiosInstance.post("/auth/passkey", { Passkey: formData.Passkey });
      navigate("/login");
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
    console.log("formData sent to backend:", formData); // ✅ check this
    try {
      await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      navigate("/instructions");
    } catch (error) {
      console.log("Login error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Invalid Email and Password"
      );
    }
  },
}));
