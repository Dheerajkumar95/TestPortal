import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
import { Link } from "react-router-dom";
const evaluationScreen=()=> {
  return (
    <>
    <section className="instruction-section">
       <div className='evaluation-logo'>
            <div className="evaluation">
              <img src={Logo} alt="Company Logo" />
              </div>
              <div className="evaluationlogo">
              <img src={UserLogo} alt="Company Logo"/>
            </div>
         </div>
                  
      <h2 className="evtitle">Technical Aptitude Evaluation</h2>
      <div className='evcontainer'>
      <div className="evtopic">
        <span>1. Basic programming</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="evtopic">
        <span>2. Front - End Logic</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="evtopic">
        <span>3. Back-End Logic</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="evtopic">
        <span>4. Database Concepts</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      <div className="evtopic">
        <span>5. QA Testing</span>
        <span>20 minutes</span>
        <span>15 Questions</span>
      </div>
      </div>

     <Link className='evbutton' type="submit" to="/guideline">Continue</Link>
    </section>

    </>
  );
}

export default evaluationScreen;