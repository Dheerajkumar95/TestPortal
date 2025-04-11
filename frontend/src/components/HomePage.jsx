import React from 'react';
import Logo from "../images/Logo.png";
function HomePage() {
  return (
   <>
    <div class="image">
      <img src={Logo} alt="logo" />
    </div>
    <div className='welcome'>
      <h1 class='Welcome'>Welcome!</h1>
    </div>
  </>
  );
}
export default HomePage;
