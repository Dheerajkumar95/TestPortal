import React from "react";

import login from "../images/Login.png"; // Replace with your image path
import  Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <>
    <section>
       <div className="logo-left">
              <img src={Logo} alt="logo" />
            </div>
      <div className="container_passkey">
        <div className="PasskeyImage">
          <img src={login} alt="PassKey" />
        </div>
        <div className="passkey-section">
          <div className="logintext"><h1>Login</h1></div>
          
          <h1 className="passkey-text">Email ID</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Enter email ID" required />
          </div>
          <h1 className="passkey-text">Password</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Enter Password" required />
          </div>
          <div className="button-container">
         <Link className="crt1"to="/signup">Create account</Link>
          <Link className='button' type="submit" to="/instructions">Log In</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginPage;