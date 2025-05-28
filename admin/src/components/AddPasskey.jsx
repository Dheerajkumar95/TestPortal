import React, { useState } from "react";
import { axiosInstance } from "../lib/axios"; // adjust the path if needed
 

const AddPasskey = () => {
  const [Passkey, setPasskey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Passkey) {
      setMessage("Please enter a passkey.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/passkey/create", { Passkey: Passkey });
      setMessage("Passkey added successfully!");
      setPasskey("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong.";
      setMessage(` ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passkey-form-container">
      <h2>Add New Passkey</h2>
      <form onSubmit={handleSubmit} className="passkey-form">
        <input
          type="password"
          placeholder="Enter new Passkey"
          value={Passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Passkey"}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddPasskey;
