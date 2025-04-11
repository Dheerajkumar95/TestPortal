import React from 'react';
import Logo from "../images/Logo.png";
function HomePage() {
  return (
   <>
   <div class="container">
    <div class="image">
      <img src={Logo} alt="logo" />
    </div>
    <div className='welcome'>
      <h1 class='Welcome'>Welcome!</h1>
    </div>
    </div>
    <div className='welcome-section'>
      <h2 class='welcome-text'>Welcome to the Technocrats Group!</h2>
      <div>
      <h3 class='welcome-text'>Please select your role:</h3>
      <button> <a href="#">Student</a></button><br/>  
      <button> <a href="#">Professor</a></button><br/> 
      <button> <a href="#">Admin</a></button>
      </div>
    </div>
    <footer><br/><br/><br/>
      <p>&copy; 2025 Technocrats Group. All rights reserved.</p>
    </footer>
  </>
  );
}
export default HomePage;
