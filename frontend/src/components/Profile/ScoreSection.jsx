import React from 'react';
import { Zap, Users, LightbulbIcon, GitBranch, Mail } from 'lucide-react';

const getScoreClass = (score) => {
  if (score >= 4.5) return 'excellent';
  if (score >= 3.5) return 'good';
  if (score >= 2.5) return 'average';
  return 'poor';
};

const ScoreSection = ({ scores }) => {
  const scoreItems = [
    { title: 'Technical Skills', value:4.5, icon: <GitBranch className="icon" /> },
    { title: 'Communication', value:3.2, icon: <Mail className="icon" /> },
    { title: 'Teamwork', value:4.3, icon: <Users className="icon" /> },
    { title: 'Problem Solving', value:5, icon: <LightbulbIcon className="icon" /> },
    { title: 'Leadership Skills', value:4.1, icon: <Zap className="icon" /> },
  ];

  return (
    <div className="scores-container">
      <h2 className="section-title">Performance Scores</h2>
      <div className="score-grid">
        {scoreItems.map((item, index) => (
          <div key={index} className="score-card">
            <div className="score-title">
              <div className="score-label">
                {item.icon}
                <span className="score-name">{item.title}</span>
              </div>
              <span className="score-value">{item.value}/5</span>
            </div>
            <div className="score-bar-container">
              <div
                className={`score-bar ${getScoreClass(item.value)}`}
                style={{ '--score-width': `${(item.value / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreSection;
