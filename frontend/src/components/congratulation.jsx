import React from 'react';
import { useLocation } from 'react-router-dom';
import usePreventCopyBlur from "./usePreventCopyBlur";
const Congratulations = () => {
  const location = useLocation();
    usePreventCopyBlur();
  const { score, total } = location.state || {};

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
