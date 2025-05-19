import React, { useState } from 'react';
import PassKeyImage from "../images/PassKey.png";
import { useNavigate } from "react-router-dom";

const Guideline = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartTest = () => {
    if (isChecked) {
      navigate("/quiz");
    } else {
      alert("Please accept the terms and conditions before starting the test.");
    }
  };

  return (
    <section className="instruction-section">
      <div className="instruction-container">
        <div className="illustration">
          <img src={PassKeyImage} alt="Exam Illustration" />
        </div>
        <div className="instruction-box">
          <h2>Read the instructions carefully before proceeding further.</h2>
          <ul>
            <li>Each section has 20 questions and a 30-minute time limit.</li>
            <li>Complete all questions within the time limit for each section.</li>
            <li>The exam duration is fixed; no extra time will be provided.</li>
            <li>Ensure you have a stable internet connection and use the recommended browser.</li>
            <li>Do not refresh or close the exam window during the test.</li>
            <li>Only use authorized devices; multiple logins are not allowed.</li>
            <li>Cheating is prohibited, and the exam may be monitored.</li>
            <li>Submit your answers before the timer runs out.</li>
            <li>If the exam is being supervised, follow all proctoring guidelines.</li>
            <li>Do not take screenshots, screen record, or switch to another tab during the exam.</li>
            <li>The test duration is 2 hours and 30 minutes with no extra time allowed.</li>
          </ul>
        </div>
      </div>

      <div className='cheakbox-container'>
        <div className='checkbox'>
          <input  
          className='inputbox'
            type="checkbox" 
            id="myCheckbox" 
            checked={isChecked} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="myCheckbox"> Accept Terms and Conditions</label>
        </div>
        <div className="start-wrapper">
          <h1 
            className='evbutton' 
            type="button" 
            onClick={handleStartTest}
            disabled={!isChecked}
            style={{ 
              opacity: isChecked ? 1 : 0.5,
              cursor: isChecked ? 'pointer' : 'not-allowed' 
            }}
          >
            Start The Test
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Guideline;
