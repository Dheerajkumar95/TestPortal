import React, { useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, GraduationCap, Calendar, Users, BookOpen, Award } from "lucide-react";
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
    dob: "",
    gender: "",
    collegeName: "",
    course: "",
    tenthMarks: "",
    tenthYearOfPassing: "",
    twelfthMarks: "",
    twelfthYearOfPassing: "",
    cgpa: {
      sem1: "",
      sem2: "",
      sem3: "",
      sem4: "",
      sem5: "",
      sem6: "",
      sem7: "",
      sem8: "",
    },
  });

  const buttonRef = useRef(null);

  const validateForm = () => {
    const { fullName, contact, email, password, 
      confirmPassword, dob, gender, collegeName, course,
      tenthMarks,tenthYearOfPassing,twelfthMarks,twelfthYearOfPassing,} = formData;

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!contact.trim()) {
      toast.error("Contact is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!dob) {
      toast.error("Date of birth is required");
      return false;
    }
    if (!gender) {
      toast.error("Gender is required");
      return false;
    }
    if (!collegeName) {
      toast.error("College name is required");
      return false;
    }
    if (!course) {
      toast.error("Course is required");
      return false;
    }
    if (!formData.batch) {
      toast.error("Batch is required");
      return false;
    }
    if (!formData.rollNumber || formData.rollNumber.length !== 12) {
      toast.error("Roll number must be exactly 12 characters");
      return false;
    }
    if (!formData.branch) {
      toast.error("Branch is required");
      return false;
    }

     if (!tenthMarks.trim()) {
    toast.error("10th Marks are required");
    return false;
  }
  if (!tenthYearOfPassing.trim()) {
    toast.error("10th Year of Passing is required");
    return false;
  }
  if (!twelfthMarks.trim()) {
    toast.error("12th Marks are required");
    return false;
  }
  if (!twelfthYearOfPassing.trim()) {
    toast.error("12th Year of Passing is required");
    return false;
  }

    
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

  const handleCGPAChange = (semester, value) => {
    setFormData({
      ...formData,
      cgpa: {
        ...formData.cgpa,
        [semester]: value,
      },
    });
  };

   
  return (
         <>
    {showOTP ? (
      <VerificationPage email={formData.email}  formData={formData}/>
    ) : (
    <section className="signUp" id="signUp">
      <div className="signUp-container">
        <form onSubmit={handleSubmit}>
          <div className="passkey-section1">
            <div className="header-section">
              <div className="header-icon">
                <User className="main-icon" />
              </div>
              <h1 className="signUp-text">Create Account</h1>
              <p className="signUp-subtitle">Join us today and start your journey</p>
            </div>
            
            <div className="InputMethodsignUp">
              {/* Personal Information Section */}
              <div className="form-section">
                <h2 className="section-title">
                  <User className="section-icon" />
                  Personal Information
                </h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label style={{ marginRight: "-4rem"}}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-5rem"}}>Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-3rem"}}>Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-6.5rem"}}>Contact Number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="10"
                      minLength="10"
                      pattern="[0-9]*"
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, contact: onlyDigits });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div className="form-section">
                <h2 className="section-title">
                  <Mail className="section-icon" />
                  Account Information
                </h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label style={{ marginRight: "-5.8rem"}}>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-5rem"}}>Roll Number</label>
                    <input
                      type="text"
                      placeholder="Enter roll number"
                      value={formData.rollNumber}
                      maxLength={12}
                      minLength={12}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value.toUpperCase() })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-7rem"}}>Create Password</label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-7.5rem"}}>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="form-section">
                <h2 className="section-title">
                  <GraduationCap className="section-icon" />
                  Academic Information
                </h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label style={{ marginRight: "-5.5rem"}}>College Name</label>
                    <select
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      required
                    >
                      <option value="">Select College</option>
                      <option value="TIT Main">TIT Main</option>
                      <option value="TIT Ex">TIT Ex</option>
                      <option value="TIT Advance">TIT Advance</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-2.5rem"}}>Course</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                    >
                      <option value="">Select Course</option>
                      <option value="BTech">BTech</option>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-2rem"}}>Batch</label>
                    <select
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      required
                    >
                      <option value="">Select Batch</option>
                      <option value="2022-26">2022-26</option>
                      <option value="2023-27">2023-27</option>
                      <option value="2024-28">2024-28</option>
                      <option value="2025-29">2025-29</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label style={{ marginRight: "-2.5rem"}}>Branch</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      required
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="CSE-AIML">CSE (AIML)</option>
                      <option value="CSE-AIDS">CSE (AIDS)</option>
                      <option value="CSE-DS">CSE (DS)</option>
                      <option value="CSE-AI">CSE (AI)</option>
                      <option value="Cyber">Cyber Security</option>
                      <option value="IT">IT</option>
                      <option value="EC">EC</option>
                      <option value="EX">EX</option>
                      <option value="CIVIL">Civil</option>
                      <option value="ME">Mechanical</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Educational Background Section */}
              <div className="form-section">
                <h2 className="section-title">
                  <BookOpen className="section-icon" />
                  Educational Background
                </h2>
                <div className="education-grid">
                  <div className="education-item">
                    <label style={{ marginRight: "-6.5rem"}}>10th Marks (%)</label>
                    <input
                      type="number"
                      placeholder="Enter 10th percentage"
                      min="0"
                      max="100"
                      step="0.50"
                      value={formData.tenthMarks}
                      onChange={(e) => setFormData({ ...formData, tenthMarks: e.target.value })}
                    />
                  </div>
                  <div className="education-item">
                    <label style={{ marginRight: "-8rem"}}>10th Year of Passing</label>
                    <input
                      type="number"
                      placeholder="Enter year"
                      min="2000"
                      max="2030"
                      value={formData.tenthYearOfPassing}
                      onChange={(e) => setFormData({ ...formData, tenthYearOfPassing: e.target.value })}
                    />
                  </div>
                  <div className="education-item">
                    <label style={{ marginRight: "-6.5rem"}}>12th Marks (%)</label>
                    <input
                      type="number"
                      placeholder="Enter 12th percentage"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.twelfthMarks}
                      onChange={(e) => setFormData({ ...formData, twelfthMarks: e.target.value })}
                    />
                  </div>
                  <div className="education-item">
                    <label style={{ marginRight: "-8rem"}}>12th Year of Passing</label>
                    <input
                      type="number"
                      placeholder="Enter year"
                      min="2000"
                      max="2030"
                      value={formData.twelfthYearOfPassing}
                      onChange={(e) => setFormData({ ...formData, twelfthYearOfPassing: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SGPA Section */}
              <div className="form-section">
                <h2 className="section-title">
                  <Award className="section-icon" />
                  Semester SGPA
                </h2>
                <div className="sgpa-grid">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="sgpa-item">
                      <label style={{ marginRight: "-16rem"}}>Sem {i + 1} SGPA</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        max="10"
                        step="0.01"
                        value={formData.cgpa[`sem${i + 1}`]}
                        onChange={(e) => handleCGPAChange(`sem${i + 1}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button ref={buttonRef} className="createbutton" type="submit">
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
        )}
    </>
  );
};

export default SignUp;