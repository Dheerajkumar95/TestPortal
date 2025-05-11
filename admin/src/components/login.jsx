import React from 'react';
import  Admin from '../images/admin.png'; 
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side */}
        <div className="login-image">
          <img src={Admin} alt="Login" />
        </div>

        {/* Right Side (Form) */}
        <div className="login-form">
         <div className="login-header">
          <h2 className="login-title">Admin Dashboard login</h2>
          <p className="note">Only admin login</p>
          </div>
          <form>
            <label>User ID</label>
            <input type="text" placeholder="Enter User ID" />

            <label>&nbsp;&nbsp;&nbsp;Password</label>
            <input type="password" placeholder="Enter Password" />
            <Link className='button' type="submit" to="/dashboard">Log In</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
