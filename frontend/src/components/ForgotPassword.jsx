import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

   try {
  setLoading(true);
  const response = await axiosInstance.post("/auth/forgotPassword", {
    email,
  });
  toast.success(response.data.message || "Reset link sent!");
  setEmail("");
} catch (error) {
  toast.error(error.response?.data?.error || "Failed to send reset link.");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="emailid">Email ID</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="login-link">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
