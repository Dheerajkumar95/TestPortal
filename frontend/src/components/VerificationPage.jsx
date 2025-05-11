import React, { useRef, useEffect, useState } from 'react';
import { useAuthStore } from "../store/useAuthStore";

const VerificationPage = ({ email, formData }) => {
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const { Verification } = useAuthStore();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const submitOTP = (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((input) => input.value).join('');
    
    if (otp.length !== 6) {
      return alert("Please enter the 6-digit OTP");
    }

    // ✅ Now formData is passed correctly
    Verification(otp, formData);
    console.log("Submitted OTP:", otp, "Form Data:", formData);
  };

  const resendOTP = () => {
    setTimer(30);
    setIsResendEnabled(false);
    // TODO: Call backend to resend OTP
    console.log("OTP resent to:", email);
  };

  return (
    <div className="container">
      <div className="otp-box">
        <h2>OTP Verification</h2>
        <p>Email: {email}</p>
        <div className="otp-inputs">
          {Array(6).fill(0).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>
        <button onClick={submitOTP} className='otp-box-button'>Verify OTP</button>

        <div className='resend-section'>
          {isResendEnabled ? (
            <h1 onClick={resendOTP} className='resend'>Resend OTP</h1>
          ) : (
            <span className='resend-timer'>Resend in {timer}s</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;