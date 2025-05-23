import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Optional: Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axiosInstance.get(`/auth/verify-token/${token}`);
        if (res.data.message) {
          setMessage(res.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Invalid or Link expired.");
      }
    };
    verifyToken();
  }, [token]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  // ✅ Password validation using toast
  if (!password) return toast.error("Password is required");
  if (password.length < 8) return toast.error("Password must be at least 8 characters");
  if (password !== confirmPassword) return toast.error("Passwords do not match");

  try {
    setLoading(true);

    const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });

    toast.success(response.data.message || "Password reset successful!");
    setTimeout(() => navigate("/login"), 1500); // Wait 1.5 seconds before redirecting
  } catch (error) {
    toast.error(error.response?.data?.message || "Password reset failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>

        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ marginRight: "-10px"}} htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
