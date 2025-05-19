import React from 'react';
import { Link } from "react-router-dom";
const evaluationScreen=()=> {
  const topics = [
  { id: 1, name: "Basic programming", time: "30 minutes", questions: "20 Questions" },
  { id: 2, name: "Front - End Logic", time: "30 minutes", questions: "20 Questions" },
  { id: 3, name: "Back-End Logic", time: "30 minutes", questions: "20 Questions" },
  { id: 4, name: "Database Concepts", time: "30 minutes", questions: "20 Questions" },
  { id: 5, name: "QA Testing", time: "30 minutes", questions: "20 Questions" },
];
  return (
    <>
    <section className="instruction-section">
      <h2 className="evtitle">Technical Aptitude Evaluation</h2>
      <div className="evtopic-container">
  {topics.map((topic) => (
    <div key={topic.id} className={`evtopic ${topic.id === 2 ? 'active' : ''}`}>
      <span className="topic-name">{topic.id}. {topic.name}</span>
      <span>{topic.time}</span>
      <span>{topic.questions}</span>
    </div>
  ))}
</div>

     <Link className='evbutton' type="submit" to="/guideline">Continue</Link>
    </section>

    </>
  );
}

export default evaluationScreen;