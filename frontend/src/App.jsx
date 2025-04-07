import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import  HomePage from "./components/HomePage"
function App() {
  return (
    <>
      <HomePage/>
      <Toaster /> 
    </>
  )
}

export default App
