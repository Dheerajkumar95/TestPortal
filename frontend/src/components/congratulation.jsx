import React from 'react';
import Logo from '../images/Logo.png';
import UserLogo from "../images/UserLogo.png";
import Congratulation from "../images/congratulation.jpg";
import { Link } from "react-router-dom";
const congratulation=()=> {
    return (
    <>
    <section>
    <div className="container">
      <h1>congratulation</h1>
      <div className="stars">
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star filled">★</span>
        <span className="star filled">★</span>
      </div>
    </div>
    </section>
    </>
  );
};

export default congratulation;
