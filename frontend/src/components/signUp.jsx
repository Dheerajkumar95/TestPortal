import React from "react";
import CreateAccount from "../images/CreateAccount.png";
import  Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
const signUp=()=>{

    return(
        <>
        <section className="signUp" id="signUp">
           <div className="logo-left">
              <img src={Logo} alt="logo" />
                </div>
        <div class='signUpimg'>
        <img src={CreateAccount} alt="signUp" />
        </div>
        <h1 class="signUp-text">Create Account</h1>
        <div class="passkey-section1">
        <div class='InputMethodsignUp'>
        <h1 className="passkey-text">Name</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Enter Name" required />
          </div>
          <h1 className="passkey-text">Email ID</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Enter Email ID" required />
            <h1 className="passkey-text">Contact Number</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Enter Contact Number" required />
          </div>
          <h1 className="passkey-text"> Create Password</h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Create Password" required />
            <h1 className="passkey-text"> Confirm Password </h1>
          <div className="InputMethodPasskey">
            <input type="text" placeholder="Confirm Password" required />
            <Link className='button' type="submit" to="/login">Submit</Link>
          </div>
          </div>
        </div>
      
    </div>
  </div>
</section> 
</>
    );
};
export default signUp;