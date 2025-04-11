import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage"
import LoginPage from './components/LoginPage';
import Passkey from './components/PassKey';
function App() {
  return (
    <>
      <HomePage/>
      <Passkey/>
      <LoginPage/>
      <Toaster /> 
    </>
  )
}

export default App