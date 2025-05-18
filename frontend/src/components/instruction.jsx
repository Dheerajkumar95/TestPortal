import React from 'react';
import PassKeyImage from "../images/PassKey.png";
import UserLogo from "../images/UserLogo.png";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
const InstructionScreen = () => {
  return (
    <section className="instruction-section">
      
      <div className="instruction-container">
        <div className="illustration">
          <img src={PassKeyImage} alt="Exam Illustration" />
        </div>

        <div className="instruction-box">
          <h2>Read the instructions carefully before proceeding further.</h2>
          <ul>
            <li>The exam duration is fixed, and no extra time will be given.</li>
            <li>Ensure a stable internet connection and use the recommended browser.</li>
            <li>Do not refresh or close the exam window during the test.</li>
            <li>Use only authorized devices; multiple logins are prohibited.</li>
            <li>Avoid cheating or using unfair means; the exam may be monitored.</li>
            <li>Submit your answers before the timer runs out.</li>
            <li>Follow all proctoring guidelines if the exam is being supervised.</li>
            <li>The test consists of sections: Aptitude, Logical Reasoning, English, Behavioral, and Coding.</li>
            <li>Each section contains 20 questions.</li>
            <li>Each section has a time limit of 30 minutes.</li>
            <li>Questions must be attempted within the given time limit for each section.</li>
          </ul>
        </div>
      </div>

      <div className="continue-wrapper">
        <Link className='button' type="submit" to="/evaluation">Continue</Link>
      </div>
    </section>
  );
};

export default InstructionScreen;
