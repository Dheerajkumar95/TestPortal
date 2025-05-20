import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [statuses, setStatuses] = useState({});
  const [timeLeft, setTimeLeft] = useState(30* 60); // 20 minutes

  const navigate = useNavigate();
  const handleSubmit = () => {
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedOptions).length;

  if (answeredCount < totalQuestions) {
    toast.error("Please answer all questions before submitting.");
    return;
  }

  navigate('/congratulations');
};
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
      if (prev <= 1) {
        clearInterval(timer);
        navigate('/congratulations'); // Navigate to Congratulations page
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, [navigate]); // Add navigate in dependency array


  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
const handleOptionSelect = (qid, optId) => {
  setSelectedOptions(prev => ({ ...prev, [qid]: optId }));
  setStatuses(prev => ({ ...prev, [current]: 'Marked' }));
};
const handleNext = () => {
  setStatuses(prev => ({
    ...prev,
    [current]: prev[current] === 'Marked' ? 'Marked' : 'Visited',
  }));
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
 
const totalTime = 30 * 60;  

const getColor = () => {
  if (timeLeft <= 5 * 60) return "#FF3131";
  if (timeLeft <= 15 * 60) return "#FFFF00";
  return "rgb(24, 182, 74)";
 
};

const percentage = (timeLeft / totalTime) * 100;


  return (
    <>
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
  <CircularProgressbar
    value={percentage}
    text={formatTime(timeLeft)}
    styles={buildStyles({
      pathColor: getColor(),
      textColor: "#000",
      trailColor: "#eee",
    })}
  />
</div>

        <h2 className="quiz-title">Front-End Logic</h2>
       <div className="question-container">
      {currentQ.image && (
    <img
      src={currentQ.image}
      alt={`Question ${current + 1}`}
      className="question-image"
      style={{ maxWidth: "100%", marginBottom: "1rem" }}
    />
     )}
  <p className="question-text">Q{current + 1}. {currentQ.question}</p>
</div>

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
         

      </div>
    </div>
      <div className="nav-buttons-container">
  {/* Back button (only shows when current > 0) */}
  {current > 0 && (
    <h1 onClick={handleBack} className="nav-btn">Back</h1>
  )}

  {/* Save & Next or Submit button */}
  {current === questions.length - 1 ? (
    <h1 onClick={handleSubmit} className="nav-btn">Submit</h1>
  ) : (
    <h1 onClick={handleNext} className="nav-btn">Save & Next</h1>
  )}
</div>
</>
  );
};

export default QuizPage;
