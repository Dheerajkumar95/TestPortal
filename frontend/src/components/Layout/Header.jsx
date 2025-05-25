import React from 'react';
import { GraduationCap, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Header-inner">
          <div className="Header-title">
            <GraduationCap size={32}/>
          <span className="logo-text">TestPortal</span>
          </div>

          <nav className="nav-links">
            <a href="/wel" className="nav-link">Dashboard</a>
            <a href="/wel/user-details" className="nav-link">Profile</a>
            <a href="/wel/passkey" className="nav-link">Weekly test</a>
          </nav>

          <div className="user-actions">
            <button className="logout-btn">
              <LogOut  className="user-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
