// Dashboard.jsx
import React from 'react';
import { Link } from "react-router-dom";
const Dashboard = () => {
  const data = {
    totalCreated: 150,
    totalSubmitted: 120,
    notSubmitted: 30,
    todayCreated: 10,
    todaySubmitted: 8,
    todayNotSubmitted: 2,
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>TIT College Test Submission</h2>
        <div className="user-info">
          <Link className='logout-btn' type="submit" to="/add-passkey">Add Passkey</Link>
          <Link className='logout-btn' type="submit" to="/add-question">Add Question</Link>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="stats-row">
        <StatCard title="Total Account Created" value={data.totalCreated} />
        <StatCard
          title="Total Submitted"
          value={`${data.totalSubmitted}/${data.totalCreated}`}
        />
        <StatCard
          title="Not Submitted"
          value={`${data.notSubmitted}/${data.totalCreated}`}
        />
      </div>

      <hr className="divider" />

      {/* Today's Stats */}
      <div className="stats-row">
        <StatCard title="Total Account Created" value={data.todayCreated} />
        <StatCard
          title="Total Submitted"
          value={`${data.todaySubmitted}/${data.todayCreated}`}
        />
        <StatCard
          title="Not Submitted"
          value={`${data.todayNotSubmitted}/${data.todayCreated}`}
        />
      </div>

      {/* Illustration */}
      <div className="illustration-box">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/data-analysis-4482914-3738426.png"
          alt="Illustration"
          className="illustration-img"
        />
        <p>Select the section above to view details.</p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);

export default Dashboard;
