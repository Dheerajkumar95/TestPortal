import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import usePreventCopyBlur from "./usePreventCopyBlur";
import 'react-circular-progressbar/dist/styles.css';

const sections = [
  "Basic Programming",
  "Verbal and Reasoning",
  "General Aptitude",
];

const QuizPage = () => {
  const { saveScore, saveSectionScore } = useAuthStore();
  usePreventCopyBlur();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionQuestions, setSectionQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [statuses, setStatuses] = useState({});
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [waiting, setWaiting] = useState(false);
  const [waitingTimeLeft, setWaitingTimeLeft] = useState(10);

  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  const navigate = useNavigate();

  // Tab Switch Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(count => count + 1);
        toast.error("Warning: Tab switch detected!");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (tabSwitchCount >= 3) {
      toast.error("Too many tab switches! Your quiz will be submitted.");
      navigate('/congratulations');
    }
  }, [tabSwitchCount]);

  // Load Questions
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

  // Timer
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

  // Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
      setIsFullscreen(isFull);
      setShowFullscreenPrompt(!isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const requestFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const handleOptionSelect = (qid, optId) => {
    setSelectedOptions(prev => ({ ...prev, [qid]: optId }));
    setStatuses(prev => ({ ...prev, [current]: 'Marked' }));
  };

  const handleNext = () => {
    setStatuses(prev => ({ ...prev, [current]: prev[current] === 'Marked' ? 'Marked' : 'Visited' }));
    setCurrent(prev => Math.min(prev + 1, sectionQuestions.length - 1));
  };

  const handleBack = () => setCurrent(prev => Math.max(prev - 1, 0));
  const goToQuestion = (index) => setCurrent(index);

  const handleSubmitSection = async (forced = false) => {
    const unanswered = sectionQuestions.filter(q => !selectedOptions[q.id]);
    if (!forced && unanswered.length > 0) {
      toast.error("Please answer all questions before submitting the section.");
      return;
    }

    let sectionScore = 0;
    sectionQuestions.forEach(q => {
      if (selectedOptions[q.id] === q.correct) sectionScore += 1;
    });

    await saveSectionScore({
      section: sections[currentSectionIndex],
      score: sectionScore,
      total: sectionQuestions.length
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
            setTimeLeft(10 * 60);
            setWaiting(false);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      await saveScore(updatedScore, allQuestions.length);
      navigate('/congratulations', {
        state: {
          score: updatedScore,
          total: allQuestions.length,
        },
      });
    }
  };

  if (waiting) return <h2 className='nextSection'>Next section in {waitingTimeLeft} seconds...</h2>;
  if (sectionQuestions.length === 0) return <p>Loading questions...</p>;

  const currentQ = sectionQuestions[current];
  const percentage = (timeLeft / (10 * 60)) * 100;
  const getColor = () => timeLeft <= 60 ? "#FF3131" : timeLeft <= 5 * 60 ? "#FFFF00" : "rgb(100, 221, 23)";

  return (
    <>
      {/* Fullscreen Prompt Modal */}
      {showFullscreenPrompt && (
        <div className="fullscreen-modal">
          <div className="modal-content">
            <h2>Please switch to Fullscreen</h2>
            <p>This test requires fullscreen mode. Click OK to continue.</p>
            <button onClick={requestFullscreen}>OK</button>
          </div>
        </div>
      )}

      {!showFullscreenPrompt && (
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
                  styles={buildStyles({ pathColor: getColor(), textColor: "#000", trailColor: "#eee" })}
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
      )}
    </>
  );
};

export default QuizPage;
