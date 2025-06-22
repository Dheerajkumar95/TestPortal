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
  rollNumber: "",
  batch: "",
  branch: "",
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
  
    const isValid = validateForm();  
    if (!isValid) return;  
  
    const btn = buttonRef.current;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="loader"></span> Loading...`;
    }
        if (!formData.batch) return toast.error("Batch is required");
      if (!formData.rollNumber || formData.rollNumber.length !== 12)
        return toast.error("Roll number must be exactly 12 characters");
      if (!formData.branch) return toast.error("Branch is required");


    try {
      await axiosInstance.post("/auth/sendotp", 
        { email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          fullName:formData.fullName,
        });
      toast.success("OTP sent to your email");
      setShowOTP(true);
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
      <div className="signUp-left">
        <img src={CreateAccount} alt="image" />
      </div>
      

      <form onSubmit={handleSubmit}>
        <div className="passkey-section1">
           <h1 className="signUp-text">Create Account</h1>
          <div className="InputMethodsignUp">
            <h1  style={{ marginRight: "13.8rem",
              fontSize:"1rem" ,
              fontFamily:"monospace"}} 
              className="passkey-text">Name</h1>
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

            <h1 style={{ marginRight: "11.7rem",
              fontSize:"1rem" ,
              fontFamily:"monospace"}} 
              className="passkey-text">Email ID</h1>
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

            <h1 style={{ marginRight: "8.3rem",
              fontSize:"1rem",
              fontFamily:"monospace" }} 
              className="passkey-text">Contact Number</h1>
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

            <h1 style={{ marginRight: "11.6rem", 
              fontSize:"1rem", 
              fontFamily:"monospace" }} 
              className="passkey-text">Roll No.</h1>
            <div className="InputMethodPasskey">
              <input
                type="text"
                placeholder="Enter Roll Number"
                value={formData.rollNumber}
                maxLength={12}
                minLength={12}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div className="passkey-batch-branch">
             <div style={{display: "flex", gap: "1rem", marginTop: "-1rem", marginBottom: "1rem", marginLeft: "0.9rem" }}>
  <div className="FormGroup">
    <h1 className="FormLabel">Batch</h1>
    <select
      value={formData.batch}
      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
      className="StyledSelect"
      required
    >
      <option value="">Select</option>
      <option value="2022-26">2022-26</option>
      <option value="2023-27">2023-27</option>
      <option value="2024-28">2024-28</option>
      <option value="2025-29">2025-29</option>
    </select>
  </div>

  <div className="FormGroup">
    <h1 className="FormLabel">Branch</h1>
    <select
      value={formData.branch}
      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
      className="StyledSelect"
      required
    >
      <option value="">Select</option>
     <option value="CSE">CSE</option>
      <option value="CSE-AIML">CSE (AIML)</option>
      <option value="CSE-AIDS">CSE (AIDS)</option>
      <option value="CSE-AIDS">CSE (DS)</option>
      <option value="CSE-AIDS">CSE (AI)</option>
      <option value="CSE-AIDS">Cyber</option>
      <option value="CSE-AIDS">IT</option>
      <option value="CSE-AIDS">EC</option>
      <option value="CSE-AIDS">EX</option>
      <option value="CSE-AIDS">CIVIL</option>
      <option value="CSE-AIDS">ME</option>
    </select>
  </div>
</div>

            </div>
            <h1 style={{ marginRight: "7.7rem" ,
              fontSize:"1rem",
              fontFamily:"monospace"}} 
              className="passkey-text">Create Password</h1>
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

            <h1 style={{ marginRight: "7.1rem",
              fontSize:"1rem", 
              fontFamily:"monospace"}} 
              className="passkey-text" >Confirm Password</h1>
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
