import Header from './Layout/Header';
import verbal from "../images/Verbal.png";
import aptitude from "../images/aptitude.png";
import programming from "../images/Programming.png";
const  Welcome= () => {
  return (
    <>
<Header/>
    <div className="courses-container">
      <h1>Hello, What Do You Want To Learn?</h1>
      <div className="search-section">
        <input type="text" placeholder="Aptitude,Verbal Reasoning and Programming" />
        <button className="search-icon">🔍</button>
      </div>

      <div className="button-row">
        <button>Aptitude</button>
        <button>Verbal and Reasoning</button>
        <button>Programming</button>
      </div>

      <div className="courses-list">
        <div className="course-card">
          <span className="rating">⭐4.4</span>
          <img src={aptitude} alt="image"/>
          <h3>Aptitude : A Complete Guide</h3>
          <p>Beginner to Advance</p>
          <p>575k+ interested</p>
          <button>Explore now</button>
        </div>

        <div className="course-card">
          <span className="rating">⭐4.7</span>
          <img src={verbal} alt="image"/>
          <h3>Verbal and Reasoning : A Complete Guide</h3>
          <p>Intermediate and Advance</p>
          <p>309k+ interested</p>
          <button>Explore now</button>
        </div>

        <div className="course-card">
          <span className="rating">⭐4.9</span>
          <img src={programming} alt="image"/>
          <h3>Programming : A Complete Guide</h3>
          <p>Beginner to Advance</p>
          <p>335k+ interested</p>
          <button>Explore now</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default  Welcome;
