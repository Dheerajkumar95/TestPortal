import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  pendingUser: null, // ⬅️ Temporary storage

  Signup: async (contactOrEmail) => {
    try {
      await axiosInstance.post("/auth/send-otp", { contactOrEmail });
      set({ otpSentTo: contactOrEmail });
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  },
  Verification: async (otp, formData) => {
    try {
      const res = await axiosInstance.post("/auth/verifyOtpAndRegister", {
        otp,
        user: formData,
      });
      set({ authUser: res.data, otpSentTo: null });
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  },
}));
