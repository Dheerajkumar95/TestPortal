import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
import Guideline from "../images/guideline.png";
import { Link } from "react-router-dom";
const  guideline =()=> {
  return (
    <>
    <section>
    <div className="Guideline1">
      <img src={Guideline} alt="Guideline"/>
      </div>

    <div className="container">
       <div className="logo-left">
               <img src={Logo} alt="logo" />
                  </div>
                  <div className="logo-left1">
               <img src={UserLogo} alt="logo" />
                  </div>
      <div className="top-row">
        
      </div>
      </div>
      <div className="instruction-box">
          <h2>Read the instructions carefully before proceeding further.</h2>
          <ul>
            <li>Each section has 15 questions and a 20-minute time limit.</li>
            <li>Complete all questions within the time limit for each section.</li>
            <li>The exam duration is fixed; no extra time will be provided.</li>
            <li>Ensure you have a stable internet connection and use the recommended browser.</li>
            <li>Do not refresh or close the exam window during the test.</li>
            <li>Only use authorized devices; multiple logins are not allowed.</li>
            <li>Cheating is prohibited, and the exam may be monitored.</li>
            <li>Submit your answers before the timer runs out.</li>
            <li>If the exam is being supervised, follow all proctoring guidelines.</li>
            <li>Do not take screenshots, screen record, or switch to another tab during the exam.</li>
            <li>The test duration is 2 hours and 10 minutes with no extra time allowed.</li>
             </ul>
                </div>
            <div>
            <input type ="checkbox" id="myCheakbox"/> Accept Terms and Conditions
            </div>
            <div>
              <Link className='button' type="submit" to="/congratulations">Start The Test</Link>
            </div>
            
        
    </section>
    </>
  );
}

export default guideline;