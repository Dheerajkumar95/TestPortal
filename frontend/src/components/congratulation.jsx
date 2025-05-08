import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
import Congratulation from "../images/Congratulation.png";
const congratulation=()=> {
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
      <div className="header">
       
      </div>
      <h1>congratulation</h1>
      <div className="PasskeyImage">
      <img src={Congratulation} alt="congrats" width={500} />
              </div>
      <div className="stars">
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star highlighted">★</span>
      </div>
    </div>
    </section>
    </>
  );
};

export default congratulation;
