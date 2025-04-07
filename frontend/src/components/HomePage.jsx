import React from 'react';
import Logo from "../images/CreateAccount.png";
function HomePage() {
  return (
   <>
    <div class="image">
      <img src={Logo} alt="logo" />
    </div>
    <div className='welcome'>
      <h1>Welcome!</h1>
    </div>
  </>
  );
}
export default HomePage;
