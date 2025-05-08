import React from 'react';
import PassKeyImage from "../images/PassKey.png";
import  Logo from "../images/Logo.png";
const PasskeyPage = () => {
  return (
    <>
    <section>
      <div className="logo-left">
        <img src={Logo} alt="logo" />
      </div>
    <div className="passkey-container">
  <div className="passkey-left">
    <img src={PassKeyImage} alt="Passkey Illustration" />
  </div>
  <div className="passkey-right">
    <h1 className="title">PassKey Verification</h1>
    <p className="instruction">Please enter the passkey provided by the company to begin the test</p>
    <form>
      <label htmlFor="passkey">Enter Passkey</label>
      <input type="text" id="passkey" placeholder="Enter Passkey" />
      <button type="submit">Next</button>
    </form>
  </div>
</div>
    </section>
    </>
  );
};

export default PasskeyPage;