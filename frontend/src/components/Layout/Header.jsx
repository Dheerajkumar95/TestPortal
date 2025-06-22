import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:7007/api/auth/logout", {
        method: "POST",
        credentials: "include", // to send the cookie
      });

      // Optional: Clear localStorage if you use it
      localStorage.removeItem("token");

      // Redirect to login
      navigate("/dashboard");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut className="user-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
