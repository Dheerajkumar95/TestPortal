import tit from "../images/titgif.gif";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/styles.css"
const Dashboard = () => {
  const quotes = [
    "Education is the key to the future; prepare today to own tomorrow..",
    "The roots of education are bitter, but the fruit is sweet.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Learning is a treasure that will follow its owner everywhere."
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="header">
        <h1>TIT COLLEGE</h1>
        <Link className="signin-btn" to="/login">Log In</Link>
      </header>

      {/* Hero Section */}
      
      {/* Quote Section */}
      <section className="quote-section">
        <p>"{currentQuote}"</p>
      </section>

      <main className="main-content">
        <div className="image-box green-border">
          <img src={tit} alt="TIT College" />
          <div className="image-overlay">
            <h3>Campus Life&nbsp;</h3>
            <p>&nbsp;Experience our vibrant campus community</p>
          </div>
        </div>
        <div className="image-box red-border">
          <img src={tit} alt="TIT College" />
          <div className="image-overlay">
            <h3>Academic Excellence</h3>
            <p>Discover our world-class programs</p>
          </div>
        </div>
      </main>
    
       
    </>
  );
};

export default Dashboard;