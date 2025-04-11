import React from "react";
import image from "../images/Login.png";

function LoginPage() {
  return (
    <>
      <h1><u>Login</u></h1>
      <div className="LoginPageLeft">
        <div className="LoginImage">
          <br />
          <img src={image} alt="image" />
        </div>

        <form className="LoginForm" action="">
          <label htmlFor="user-id">User ID :</label>
          <br />
          <input type="text" placeholder="Input user ID" required />
          <br />
          <label htmlFor="password">Password :</label>
          <br />
          <input
            type="password"
            placeholder="Input Password"
            maxlength="12"
            minlength="6"
          />
          <br />
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember me</label>
          <br />

          <div className="LoginButton">
            <button>Log In</button>
          </div>
          <br />
        </form>
        <br />

        <div className="ForgotPassword">
          <a href="#">Forgot Password?</a>
        </div>
        <br />
        <div className="CreateAccount">
          <a href="#">Create an Account</a>
        </div>
      </div>
      <footer><br/><br/><br/>
      <p>&copy; 2025 Technocrats Group. All rights reserved.</p>
    </footer><br/><br/><br/>
    </>
  );
}
export default LoginPage;
