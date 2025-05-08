import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
const evaluationScreen=()=> {
  return (
    <>
    <section>
    <div className="container">
      <div className="logo-left">
                     <img src={Logo} alt="logo" />
                        </div>
                        <div className="logo-left1">
                     <img src={UserLogo} alt="logo" />
                        </div>
      <div className="top-row">
        
      </div>

      <h2 className="title">Technical Aptitude Evaluation</h2>

      <div className="topic">
        <span>1. Basic programming</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="topic">
        <span>2. Front - End Logic</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="topic">
        <span>3. Back-End Logic</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="topic">
        <span>4. Database Concepts</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="topic">
        <span>5. QA Testing</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>

      <button className="continue-btn">Continue</button>
    </div>
    </section>

    </>
  );
}

export default evaluationScreen;