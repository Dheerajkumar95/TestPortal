import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Website!</h1>
      <p>We're glad to have you here. Explore and enjoy!</p>
       <Link className="get-started-btn" to="passkey">Get Started</Link>
    </div>
  );
};

export default Welcome;
