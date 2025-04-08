import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import  HomePage from "./components/HomePage"
import LoginPage from './components/LoginPage';

function App() {
  return (
    <>
      <HomePage/>
      <LoginPage/>
      <Toaster /> 
    </>
  )
}

export default App
