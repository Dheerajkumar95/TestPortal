import React from 'react';
import { ChevronRight } from 'lucide-react';
import gif from "../images/design.gif";
import Navbar from './Navbar';

const Dasboard= () => {
  return (
    <>
    <Navbar/>
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-flex">
          {/* Left Content */}
          <div className="hero-left">
            <h1 className="hero-title">
              Boost Your Grades with Our
              <span> Smart Test Portal</span>
            </h1>
            <p className="hero-description">
              Prepare effectively with our adaptive testing platform. Practice, learn, and excel with thousands of curated questions across multiple subjects.
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn-primary">
                Get Started Free
                <ChevronRight size={20} className="ml-1" />
              </a>
              <a href="#" className="btn-secondary">
                View Demo
              </a>
            </div>
            
          </div>

           
          <div className="hero-right">
            <div className="hero-img-wrapper">
              <div className="circle-1"></div>
              <div className="circle-2"></div>
              <img 
                src={gif} 
                alt="Students using test portal"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Dasboard;
