import React,{useState}from "react";
import Login from "../images/Login.png"; 
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
      
          <div className="login-container">
        <div className="passkey-left">
          <img src={Login} alt="image" />
        </div>
        <div className="passkey-right">
          <h1 className="title">Login</h1>
          <form  onSubmit={handleSubmit}>
            <h1 style={{ marginRight: "20.5rem",fontSize:"1rem" ,fontFamily:"monospace" }}>Email ID</h1>
            <input   
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              placeholder="Enter email ID"
              required />
            <h1 style={{ marginRight: "20.5rem",fontSize:"1rem" ,fontFamily:"monospace" }}>Password</h1>
            <input    
            type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              placeholder="Enter password"
              required />
              
            <Link className="forgotlink" to="/forgot">Forgot Password</Link>
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