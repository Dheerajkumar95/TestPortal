import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import  HomePage from "./components/HomePage"
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPAge';

function App() {
  return (
    <>
      <HomePage/>
      <LoginPage/>
      <SignUpPage/>
      <Toaster /> 
    </>
  )
}

export default App
