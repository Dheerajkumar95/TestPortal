import React from 'react';
import Logo from "../images/Logo.png";
function HomePage() {
  return (
   <>
    <div class="image">
      <img src={Logo} alt="logo" />
    </div>
    <div className='welcome'>
      <h1>Welcome!</h1>
      <h1>Dheeraj</h1>
      <h1>hey i am shidhart</h1>
    </div>
  </>
  );
}
export default HomePage;
