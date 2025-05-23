import React from "react";

const UserDetails = () => {
  return (
    <div className="user-details-container">
      <h2 className="user-details-title">User Details</h2>
      <div className="user-details-box">
        <div className="user-info">
          <div className="user-avatar"></div>
          <div>
            <h3 className="user-name">John Doe</h3>
            <p className="user-email">john@example.com</p>
          </div>
        </div>
        <p><strong>Role:</strong> Admin</p>
        <p><strong>Status:</strong> Active</p>
      </div>
    </div>
  );
};

export default UserDetails;
