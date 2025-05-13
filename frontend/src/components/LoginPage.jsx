import React,{useState}from "react";
import Login from "../images/Login.png"; // Replace with your image path
import  Logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
   const { login } = useAuthStore();
       const navigate = useNavigate();
     const [formData,  setFormData] = useState({
         email: "",
         password: "",
      });
    
    const handleSubmit = async (e) => {
      e.preventDefault();     
        await login(formData, navigate);  
    };
  return (
    <>
    <section>
      <div className='Login-logo'>
                 <div className="Ilogo-left">
                   <img src={Logo} alt="Company Logo" />
                   </div>
                    
              </div>
      <div className="container_passkey">
        <div className="PasskeyImage">
          <img src={Login} alt="PassKey" />
        </div>
        <div className="passkey-section">
          <div className="logintext"><h1>Login</h1></div>
          <form onSubmit={handleSubmit}>
          <h1 style={{ marginRight: "0.3rem",fontSize:"1rem" ,fontFamily:"monospace" }} className="login-text">Email ID</h1>
          <div className="InputMethodPasskey">
           <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              placeholder="Enter email ID"
              required
            />
           <h1 style={{fontSize:"1rem" ,fontFamily:"monospace" }} className="login-text">Password</h1>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              placeholder="Enter password"
              required
            />
           <h6 style={{ marginRight: "-36rem",marginTop: "-22px",fontSize:"1rem" ,fontFamily:"monospace" }} className="login-text">Forgot Password</h6>
          </div>
          <div className="button-container">
         <Link className="crt1"to="/signup">Create account</Link>
          <button className='button' type="submit">Log In</button>
          </div>
          </form>
        </div>
      </div>
      
    </section>
    </>
  );
};

export default LoginPage;