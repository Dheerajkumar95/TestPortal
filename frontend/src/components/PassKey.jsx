import React, { Component } from "react";
import PassKeyImage from "../images/PassKey.png";
export class PassKey extends Component {
  render() {
    return (
      <>
        <div class="container_passkey">
        <div class='PasskeyImage'>
          <img src={PassKeyImage} alt="Image_PassKey" />
        </div>
    <div class="passkey-section">
        <h1 class="passkey-text">PassKey</h1>
        <div class='InputMethodPasskey'>
        <input type="text" placeholder="Input PassKey" required />
        </div>
      <button class="next-button">NEXT</button>
    </div>
  </div><br/>
  <footer className="footer_PAsskey">
      <p>&copy; 2025 Technocrats Group. All rights reserved.</p>
    </footer><br/><br/>
      </>
    );
  }
}

export default PassKey;
    