import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  pendingUser: null, //  Temporary storage

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
}));
