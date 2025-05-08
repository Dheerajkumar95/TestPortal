import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
const guideline =()=> {
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
      </div>
       <div className="guideline-box">
          <h2>Guidelines</h2>
          <ul>
           
          </ul>
        </div>
            <div>
            <input type ="checkbox" id="myCheakbox"/> Accept Terms and Conditions git cheak
            </div>
            
        
    </section>
    </>
  );
}

export default guideline;