import React, { useRef, useState } from "react";
import CreateAccount from "../images/CreateAccount.png";
import { toast } from "react-hot-toast";
 
import VerificationPage from './VerificationPage';
import { axiosInstance } from "../lib/axios.js";
const SignUp = () => {
 
  const [showOTP, setShowOTP] = useState(false);
 

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const buttonRef = useRef(null);

  const validateForm = () => {
    const { fullName, contact, email, password, confirmPassword } = formData;

    if (!fullName.trim()) return toast.error("Full name is required");
    if (!contact.trim()) return toast.error("Contact is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");
    if (!confirmPassword) return toast.error("confirmPassword is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = validateForm(); // ✅ yahan check hoga
    if (!isValid) return; // agar false hai toh yahin ruk jao
  
    const btn = buttonRef.current;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="loader"></span> Loading...`;
    }
  
    try {
      await axiosInstance.post("/auth/sendotp", { email: formData.email ,password: formData.password,confirmPassword: formData.confirmPassword,fullName:formData.fullName});
      toast.success("OTP sent to your email");
      setShowOTP(true); // ✅ sirf API call ke baad OTP page dikhao
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `Create Account`;
      }
    }
  };
  
  

  return (
    <>
    {showOTP ? (
      <VerificationPage email={formData.email}  formData={formData}/>
    ) : (
    <section className="signUp" id="signUp">
      <div className="Spasskey-left">
        <img src={CreateAccount} alt="signUp" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="passkey-section1">
           <h1 className="signUp-text">Create Account</h1>
          <div className="InputMethodsignUp">
            <h1  style={{ marginRight: "13.8rem" ,fontSize:"1rem" ,fontFamily:"monospace"}} className="passkey-text">Name</h1>
            <div className="InputMethodPasskey">
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            <h1 style={{ marginRight: "12rem" ,fontSize:"1rem" ,fontFamily:"monospace"}} className="passkey-text">Email ID</h1>
            <div className="InputMethodPasskey">
              <input
                type="email"
                placeholder="Enter Email ID"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value.toLowerCase() })
                }
                required
              />
            </div>

            <h1 style={{ marginRight: "8.5rem",fontSize:"1rem",fontFamily:"monospace" }} className="passkey-text">Contact Number</h1>
            <div className="InputMethodPasskey">
              <input
                type="text"
                inputMode="numeric"
                maxLength="10"
                minLength="10"
                pattern="[0-9]*"
                placeholder="Enter Contact Number"
                value={formData.contact}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, contact: onlyDigits });
                }}
                required
              />
            </div>

            <h1 style={{ marginRight: "8.2rem" ,fontSize:"1rem",fontFamily:"monospace"}} className="passkey-text">Create Password</h1>
            <div className="InputMethodPasskey">
              <input
                type="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <h1 style={{ marginRight: "7.6rem" ,fontSize:"1rem", fontFamily:"monospace"}} className="passkey-text" >Confirm Password</h1>
            <div className="InputMethodPasskey">
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            <button ref={buttonRef} className="createbutton" type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </section>
    )}
    </>
  );
};

export default SignUp;
