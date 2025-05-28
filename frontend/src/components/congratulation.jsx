import React,{useEffect} from 'react';
 
import { useLocation,useNavigate } from 'react-router-dom';
import usePreventCopyBlur from "./usePreventCopyBlur";
const Congratulations = () => {
   const navigate = useNavigate();
  const location = useLocation();
    usePreventCopyBlur();
  const { score, total } = location.state || {};

  useEffect(() => {
  const handlePopState = (e) => {
      navigate("/wel");
    window.history.pushState(null, null, window.location.pathname);
    alert("You cannot go back during the quiz.");
  };

  window.history.pushState(null, null, window.location.pathname);
  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);

  return (
    <div className="congrats-page">
      <h1>🎉 Congratulations! 🎉</h1>
      {score !== undefined ? (
        <>
          <h2>Your Score: {score} / {total}</h2>
          <p>Percentage: {((score / total) * 100).toFixed(2)}%</p>
          <p>{score / total >= 0.8 ? "Excellent work! 💯" : score / total >= 0.5 ? "Good job! Keep practicing." : "Don't worry! Practice makes perfect."}</p>
        </>
      ) : (
        <p>Result data not available.</p>
      )}
    </div>
  );
};

export default Congratulations;
