import{ useEffect, useState } from 'react';
import axios from 'axios';
import {Code,Lightbulb,Brain } from 'lucide-react';

const getScoreClass = (score) => {
  if (score >= 4) return 'excellent';
  if (score >= 3) return 'good';
  if (score >= 2) return 'average';
  return 'poor';
};

const iconsMap = {
  'Basic Programming': <Code className="icon"/>,
  'Verbal and Reasoning': <Lightbulb className="icon"/>,
  'General Aptitude': <Brain className="icon"/>,
};

const ScoreSection = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchSectionScores = async () => {
      try {
        const res = await axios.get('http://localhost:7007/api/result/getsectionscores', {
          withCredentials: true,
        });
        setScores(res.data);
      } catch (error) {
        console.error('Failed to fetch section scores', error);
      }
    };

    fetchSectionScores();
  }, []);

  return (
    <div className="scores-container">
      <h2 className="section-title">Performance Scores</h2>
      <div className="score-grid">
        {scores.map((item, index) => (
          <div key={index} className="score-card">
            <div className="score-title">
              <div className="score-label">
                {iconsMap[item.sectionName]}
                <span className="score-name">{item.sectionName}</span>
              </div>
              <span className="score-value">
                {item.score}/{item.totalQuestions}
              </span>
            </div>
            <div className="score-bar-container">
              <div
                className={`score-bar ${getScoreClass(item.score)}`}
                style={{
                  width: `${(item.score / item.totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreSection;
