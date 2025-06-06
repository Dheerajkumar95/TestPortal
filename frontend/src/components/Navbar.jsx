import {GraduationCap } from 'lucide-react';

const Navbar= () => {
  
  return (
    <header >
      <nav className="container">
        <div className="logo">
          <GraduationCap size={32}/>
          <span className="logo-text">TestPortal</span>
        </div>
        {/* Auth Buttons */}
        <div className="auth-buttons md:flex">
          <a href="/login" className="login">LogIn</a>
          <a href="/signup" className="signup">Sign Up</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
