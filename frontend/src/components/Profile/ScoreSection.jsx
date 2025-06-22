import { useEffect, useState } from 'react';
import axios from 'axios';
import { Code, Lightbulb, Brain } from 'lucide-react';

const getScoreClass = (score) => {
  if (score >= 25) return 'excellent';
  if (score >= 20) return 'good';
  if (score >= 15) return 'average';
  return 'poor';
};

const iconsMap = {
  'Programming': <Code className="icon" />,
  'Verbal and Reasoning': <Lightbulb className="icon" />,
  'Aptitude': <Brain className="icon" />,
};

const ScoreSection = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchSectionScores = async () => {
      try {
        const res = await axios.get('http://localhost:7007/api/result/getsectionscores', {
          withCredentials: true,
        });
        setAttempts(res.data); // grouped by attempt
      } catch (error) {
        console.error('Failed to fetch section scores', error);
      }
    };

    fetchSectionScores();
  }, []);

  return (
    <div className="scores-container">
      <h2 className="section-title">Performance by Attempt</h2>

      {attempts.map((attemptData, index) => (
        <div key={index} className="attempt-section">
          <h3 className="attempt-title">Attempt {attemptData.attempt}</h3>

          <div className="score-grid">
            {attemptData.sections.map((section, idx) => (
              <div key={idx} className="score-card">
                <div className="score-title">
                  <div className="score-label">
                    {iconsMap[section.sectionName]}
                    <span className="score-name">{section.sectionName}</span>
                  </div>
                  <span className="score-value">
                    {section.score}/{section.totalQuestions}
                  </span>
                </div>
                <div className="score-bar-container">
                  <div
                    className={`score-bar ${getScoreClass(section.score)}`}
                    style={{
                      width: `${(section.score / section.totalQuestions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreSection;
