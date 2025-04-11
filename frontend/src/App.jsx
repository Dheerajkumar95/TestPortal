import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage"
import LoginPage from './components/LoginPage';
import Passkey from './components/PassKey';
import CreateAccount from './components/CreateAccount';
function App() {
  return (
    <>
      <HomePage/>
      <Passkey/>
      <LoginPage/>
      <CreateAccount/>
      <Toaster /> 
    </>
  )
}

export default App