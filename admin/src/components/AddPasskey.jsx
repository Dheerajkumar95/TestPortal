import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";


const AddPasskey = () => {
  const [Passkey, setPasskey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 const { addPasskey } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Passkey) {
      setMessage("Please enter a passkey.");
      return;
    }

     if (Passkey.length < 8) {
    setMessage("Passkey must be at least 8 characters long.");
    return;
  }
  
    try {
      setLoading(true);
       await addPasskey(Passkey);
      setMessage("Passkey added successfully!");
      setPasskey("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Passkey already exists.";
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
