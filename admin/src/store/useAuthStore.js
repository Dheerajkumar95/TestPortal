// store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  addPasskey: async (passkey) => {
    if (!passkey) {
      toast.error("Please enter a passkey.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/passkey/create", {
        Passkey: passkey,
      });
      toast.success("Passkey added successfully!");
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong.";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  },
}));
