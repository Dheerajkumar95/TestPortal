import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
const evaluationScreen2=()=> {
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
      <p>section Attempted 1/5 </p>
      
      <div className="topics-box">
  <h2 className="box-title">Topics Overview</h2>
  <div className="topics-content">
    <p>1. Basic programming — 20 minutes — 15 Questions</p>
    <p>2. Front - End Logic — 20 minutes — 15 Questions</p>
    <p>3. Back-End Logic — 20 minutes — 15 Questions</p>
    <p>4. Database Concepts — 20 minutes — 15 Questions</p>
    <p>5. QA Testing — 20 minutes — 15 Questions</p>
  </div>
</div>

      <button className="continue-btn">Continue</button>
    </div>
    </section>

    </>
  );
}

export default evaluationScreen2;