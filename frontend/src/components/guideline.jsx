import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
import PassKeyImage from "../images/PassKey.png";
import { Link } from "react-router-dom";
const  guideline =()=> {
  return (
    <>
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
            <input type ="checkbox" id="myCheakbox"/> Accept Terms and Conditions
            </div>
            <div className="start-wrapper">
               <Link className='Button' type="submit" to="/quiz">Start The Test</Link>
            </div>
            </div>
            
        
    </section>
    </>
  );
}

export default guideline;