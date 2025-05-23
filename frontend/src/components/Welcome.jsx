import { Link } from "react-router-dom";
import Header from './Layout/Header';
import dsa from "../images/dsa.png";
import java from "../images/java.png";
import tech from "../images/tech.png";
const  Welcome= () => {
  return (
    <>
<Header/>
    <div className="courses-container">
      <h1>Hello, What Do You Want To Learn?</h1>
      <div className="search-section">
        <input type="text" placeholder="Data Structures and Algori" />
        <button className="search-icon">🔍</button>
      </div>

      <div className="button-row">
        <button>Full Stack Live Classes</button>
        <button>DSA: Basic To Advanced Course</button>
        <button>Master DS & ML</button>
      </div>

      <div className="courses-list">
        <div className="course-card">
          <span className="rating">⭐4.4</span>
          <img src={dsa} alt="image"/>
          <h3>DSA to Development: A Complete Guide</h3>
          <p>Beginner to Advance</p>
          <p>575k+ interested</p>
          <button>Explore now</button>
        </div>

        <div className="course-card">
          <span className="rating">⭐4.7</span>
          <img src={java} alt="image"/>
          <h3>JAVA Backend Development - Live</h3>
          <p>Intermediate and Advance</p>
          <p>309k+ interested</p>
          <button>Explore now</button>
        </div>

        <div className="course-card">
          <span className="rating">⭐4.9</span>
          <img src={tech} alt="image"/>
          <h3>Tech Interview 101 - From DSA to System Design</h3>
          <p>Beginner to Advance</p>
          <p>335k+ interested</p>
          <button>Explore now</button>
        </div>
      </div>
      <div className="week">
      <Link className="weekly-btn" to="passkey">Weekly Test</Link>
      </div>
    </div>
    </>
  );
};

export default  Welcome;
