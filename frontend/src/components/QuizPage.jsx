import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const sections = [
  "Basic Programming",
  "Front-End Logic",
  "Back-End Logic",
  "Database",
  "General Computer Knowledge",
];

const QuizPage = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionQuestions, setSectionQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [statuses, setStatuses] = useState({});
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const [waiting, setWaiting] = useState(false);
  const [waitingTimeLeft, setWaitingTimeLeft] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7007/api/auth/questions')
      .then(res => {
        setAllQuestions(res.data);
        const sectionQ = res.data.filter(q => q.section === sections[0]);
        setSectionQuestions(sectionQ);
        const initialStatuses = {};
        sectionQ.forEach((_, idx) => initialStatuses[idx] = 'Not Visited');
        setStatuses(initialStatuses);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitSection(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sectionQuestions]);

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
    setCurrent(prev => Math.min(prev + 1, sectionQuestions.length - 1));
  };

  const handleBack = () => {
    setCurrent(prev => Math.max(prev - 1, 0));
  };

  const goToQuestion = (index) => {
    setCurrent(index);
  };

  const handleSubmitSection = (forced = false) => {
    const unanswered = sectionQuestions.filter(q => !selectedOptions[q.id]);
    if (!forced && unanswered.length > 0) {
      toast.error("Please answer all questions before submitting the section.");
      return;
    }

    let sectionScore = 0;
    sectionQuestions.forEach(q => {
      if (selectedOptions[q.id] === q.correct) sectionScore += 1;
    });

    const updatedScore = score + sectionScore;

    if (currentSectionIndex < sections.length - 1) {
      setScore(updatedScore);
      setWaiting(true);
      setWaitingTimeLeft(10);

      const countdown = setInterval(() => {
        setWaitingTimeLeft(prev => {
          if (prev === 1) {
            clearInterval(countdown);

            const nextIndex = currentSectionIndex + 1;
            const nextQuestions = allQuestions.filter(q => q.section === sections[nextIndex]);

            const newStatuses = {};
            nextQuestions.forEach((_, idx) => newStatuses[idx] = 'Not Visited');

            setCurrentSectionIndex(nextIndex);
            setSectionQuestions(nextQuestions);
            setStatuses(newStatuses);
            setSelectedOptions({});
            setCurrent(0);
            setTimeLeft(2 * 60);
            setWaiting(false);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      navigate('/congratulations', {
        state: {
          score: updatedScore,
          total: allQuestions.length,
        },
      });
    }
  };

  if (waiting) return <h2 style={{ textAlign: "center" }}>Next section in {waitingTimeLeft} seconds...</h2>;
  if (sectionQuestions.length === 0) return <p>Loading questions...</p>;

  const currentQ = sectionQuestions[current];
  const percentage = (timeLeft / (2 * 60)) * 100;
  const getColor = () => {
    if (timeLeft <= 60) return "#FF3131";
    if (timeLeft <= 5 * 60) return "#FFFF00";
    return "rgb(24, 182, 74)";
  };

  return (
    <>
      <div className="quiz-app">
        <div className="sidebar">
          <h4>Marked <span>{Object.values(statuses).filter(s => s === 'Marked').length}</span></h4>
          <h4>Not Visited <span>{Object.values(statuses).filter(s => s === 'Not Visited').length}</span></h4>
          <h4>Active <span>1</span></h4>

          <div className="question-grid">
            {sectionQuestions.map((_, idx) => (
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

          <h2 className="quiz-title">{sections[currentSectionIndex]}</h2>

          <div className="question-container">
            {currentQ.image && (
              <img src={currentQ.image} alt={`Q${current + 1}`} className="question-image" />
            )}
            <p className="question-text">Q{current + 1}. {currentQ.question}</p>
          </div>

          {currentQ.options.map((opt, idx) => (
            <div className="option-container" key={idx}>
              <label className="option-label">
                <input
                  type="radio"
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

      <div className="nav-buttons-container">
        {current > 0 && <h1 onClick={handleBack} className="nav-btn">Back</h1>}
        {current === sectionQuestions.length - 1 ? (
          <h1
            onClick={() => handleSubmitSection(false)}
            className={`nav-btn ${sectionQuestions.some(q => !selectedOptions[q.id]) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit
          </h1>
        ) : (
          <h1 onClick={handleNext} className="nav-btn">Save & Next</h1>
        )}
      </div>
    </>
  );
};

export default QuizPage;
