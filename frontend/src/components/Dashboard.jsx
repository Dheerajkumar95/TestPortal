import tit from "../images/titgif.gif";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <header className="header">
        <h1>TIT COLLEGE</h1>
        <Link className="signin-btn" to="/login">Log In</Link>
      </header>

      {/* Quote Section */}
      <section className="quote-section">
        <p>
          “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
        </p>
      </section>

      <main className="main-content">
        <div className="image-box green-border">
          <img src={tit} alt="tit" />
        </div>
        <div className="image-box red-border">
          <img src={tit} alt="tit" />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
