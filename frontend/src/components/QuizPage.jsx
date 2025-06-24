import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import usePreventCopyBlur from "./usePreventCopyBlur";
import 'react-circular-progressbar/dist/styles.css';

const QuizPage = () => {
  const { saveScore, saveSectionScore } = useAuthStore();
  usePreventCopyBlur();

  const [allQuestions, setAllQuestions] = useState([]);
  const [sections, setSections] = useState([]);
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
  const [showTabWarning, setShowTabWarning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/wel");
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(count => count + 1);
        setShowTabWarning(true);
        const sound = document.getElementById("warning-sound");
        if (sound) sound.play();
        setTimeout(() => setShowTabWarning(false), 8000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (tabSwitchCount >= 3) {
      toast.error("Too many tab switches! Your quiz will be submitted.");
      saveScore(0, allQuestions.length);
      navigate('/congratulations', {
        state: {
          score: 0,
          total: allQuestions.length,
        },
      });
    }
  }, [tabSwitchCount]);

  useEffect(() => {
    axios.get('http://localhost:7007/api/auth/questions', { withCredentials: true })
      .then(res => {
        const questions = res.data;
        setAllQuestions(questions);

        const uniqueSections = [...new Set(questions.map(q => q.section))];
        setSections(uniqueSections);

        const firstSectionQs = questions.filter(q => q.section === uniqueSections[0]);
        setSectionQuestions(firstSectionQs);

        const initialStatuses = {};
        firstSectionQs.forEach(q => {
          initialStatuses[q._id] = 'Not Visited';
        });
        setStatuses(initialStatuses);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (waiting) return;
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
  }, [sectionQuestions, waiting]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
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

  const formatTime = (secs) =>
    `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const handleOptionSelect = (qid, optId) => {
    setSelectedOptions(prev => ({ ...prev, [qid]: optId }));
    setStatuses(prev => ({ ...prev, [qid]: 'Marked' }));
  };

  const handleNext = () => {
    setStatuses(prev => {
      if (prev[sectionQuestions[current]._id] !== 'Marked') {
        return { ...prev, [sectionQuestions[current]._id]: 'Visited' };
      }
      return prev;
    });
    setCurrent(prev => Math.min(prev + 1, sectionQuestions.length - 1));
  };

  const handleBack = () => setCurrent(prev => Math.max(prev - 1, 0));
  const goToQuestion = (index) => setCurrent(index);

  const handleSubmitSection = async (forced = false) => {
    const unanswered = sectionQuestions.filter(q => !selectedOptions[q._id]);
    if (!forced && unanswered.length > 0) {
      toast.error("Please answer all questions before submitting the section.");
      return;
    }

    let sectionScore = 0;
    sectionQuestions.forEach(q => {
      if (selectedOptions[q._id] === q.correct) sectionScore += 1;
    });

    await saveSectionScore({
      section: sections[currentSectionIndex],
      score: sectionScore,
      total: sectionQuestions.length,
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
            nextQuestions.forEach(q => {
              newStatuses[q._id] = 'Not Visited';
            });

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
  const getColor = () =>
    timeLeft <= 60 ? "#FF3131" : timeLeft <= 5 * 60 ? "#FFFF00" : "rgb(100, 221, 23)";
  const imageUrl =
    currentQ.image?.startsWith('http')
      ? currentQ.image
      : `http://localhost:7007/${currentQ.image?.replace(/^\/+/, '')}`;

  return (
    <>
      <audio id="warning-sound" src="/warning.mp3" preload="auto" />

      {showTabWarning && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ff4d4f',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 9999,
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 0 10px rgba(0,0,0,0.25)'
        }}>
          🚫 Tab switch detected! Please stay on this page.
        </div>
      )}

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
                {sectionQuestions.map((question, idx) => (
                  <button
                    key={question._id}
                    onClick={() => goToQuestion(idx)}
                    className={
                      current === idx
                        ? 'question-btn active'
                        : statuses[question._id] === 'Marked'
                        ? 'question-btn marked'
                        : statuses[question._id] === 'Answered'
                        ? 'question-btn answered'
                        : statuses[question._id] === 'Visited'
                        ? 'question-btn visited'
                        : 'question-btn not-visited'
                    }
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-content">
              <div className="timer">
                <p className='time-text'>Time Left</p>
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
                  <img
                    src={imageUrl}
                    alt={`Q${current + 1}`}
                    className="question-image"
                    style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
                  />
                )}
                <p className="question-text">
                  Q{current + 1}. {currentQ.question}
                </p>
              </div>

              {currentQ.options.map(opt => (
                <div className="option-container" key={opt.id}>
                  <label className="option-label">
                    <input
                      type="radio"
                      name={`option-${currentQ._id}`}
                      value={opt.id}
                      checked={selectedOptions[currentQ._id] === opt.id}
                      onChange={() => handleOptionSelect(currentQ._id, opt.id)}
                    />
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="nav-buttons-container">
            {current > 0 && (
              <h1 onClick={handleBack} className="nav-btn">
                Back
              </h1>
            )}
            {current === sectionQuestions.length - 1 ? (
              <h1
                onClick={() => handleSubmitSection(false)}
                className="nav-btn submit-btn"
              >
                Submit
              </h1>
            ) : (
              <h1 onClick={handleNext} className="nav-btn">
                Save & Next
              </h1>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default QuizPage;
