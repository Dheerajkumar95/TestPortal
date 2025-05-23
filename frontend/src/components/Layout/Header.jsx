import React from 'react';
import { LayoutGrid, User, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Header-inner">
          <div className="Header-title">
            <LayoutGrid className="Header-title-icon" />
            <span className="Header-title-text">TIT</span>
          </div>

          <nav className="nav-links">
            <a href="/wel" className="nav-link">Dashboard</a>
            <a href="/wel/user-details" className="nav-link">Profile</a>
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
