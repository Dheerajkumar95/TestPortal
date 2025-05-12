import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [statuses, setStatuses] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes

  useEffect(() => {
     axios.get('http://localhost:7007/api/auth/questions')
      .then(res => {
        setQuestions(res.data);
        const initialStatuses = {};
        res.data.forEach((q, index) => {
          initialStatuses[index] = 'Not Visited';
        });
        setStatuses(initialStatuses);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
const handleOptionSelect = (qid, optId) => {
  setSelectedOptions(prev => ({ ...prev, [qid]: optId }));
  setStatuses(prev => ({ ...prev, [qid]: 'Marked' }));
};

  const handleNext = () => {
    setStatuses(prev => ({ ...prev, [current]: 'Marked' }));
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleBack = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const goToQuestion = (index) => {
    setCurrent(index);
  };

  if (questions.length === 0) return <p>Loading...</p>;
  const currentQ = questions[current];

  return (
    <div className="quiz-app">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h4>Marked <span>{Object.values(statuses).filter(s => s === 'Marked').length}</span></h4>
        <h4>Not Visited <span>{Object.values(statuses).filter(s => s === 'Not Visited').length}</span></h4>
        <h4>Active <span>1</span></h4>

        <div className="question-grid">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToQuestion(idx)}
              className={
                current === idx ? 'question-btn active' :
                statuses[idx] === 'Marked' ? 'question-btn marked' :
                'question-btn not-visited'
              }
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="quiz-content">
        <div className="timer">
          ⏱️ Time Left: <strong>{formatTime(timeLeft)}</strong>
        </div>
        <h2 className="quiz-title">Front-End Logic</h2>
        <p className="question-text">Q{current + 1}. {currentQ.question}</p>

        <div>
          {currentQ.options.map((opt, idx) => (
            <div className="option-container" key={idx}>
              <label className="option-label">
                <input
                  type="radio"
                  className="option-input"
                  name={`option-${currentQ.id}`}
                  value={opt.id}
                  checked={selectedOptions[currentQ.id] === opt.id}
                  onChange={() => handleOptionSelect(currentQ.id, opt.id)}
                />
                {opt.text}
              </label>
            </div>
          ))}
        </div>

        <div className="nav-buttons">
          {current > 0 && (
            <button onClick={handleBack} className="nav-btn back-btn">Back</button>
          )}
          <button onClick={handleNext} className="nav-btn next-btn">Save & Next</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
