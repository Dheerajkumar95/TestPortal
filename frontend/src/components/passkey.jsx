import React,{useState} from 'react';
import PassKeyImage from "../images/PassKey.png";
import  Logo from "../images/Logo.png";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const PasskeyPage = () => {
   const { passkey } = useAuthStore();
     const navigate = useNavigate();
   const [formPasskey, setFormPasskey] = useState({
      Passkey:"",
    });
  
  const handleSubmit = async (e) => {
    e.preventDefault();     
      await passkey(formPasskey, navigate);  
  };
  return (
    <>
    <section>
    <div className="passkey-container">
  <div className="passkey-left">
    <img src={PassKeyImage} alt="Passkey Illustration" />
  </div>
  <div className="passkey-right">
    <h1 className="title">PassKey Verification</h1>
    <p className="instruction">Please enter the passkey provided by the company to begin the test</p>
    <form  onSubmit={handleSubmit}>
      <h1 style={{ marginRight: "17.5rem",fontSize:"1rem" ,fontFamily:"monospace" }}>Enter Passkey</h1>
      <input    type="text"
                value={formPasskey.Passkey}
                onChange={(e) =>
                  setFormPasskey({ ...formPasskey, Passkey: e.target.value })
                }
                required  
                id="passkey" 
                placeholder="Enter Passkey" />
      <button className='button' type="submit">Next</button>
    </form>
  </div>
</div>
    </section>
    </>
  );
};

export default PasskeyPage;