import './App.css'
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import LoginPage from './components/LoginPage';
import SignUp from './components/signUp';
import InstructionScreen from './components/instruction';
import EvaluationScreen from './components/EvalutionScreen';
import Guideline from './components/guideline';
import EvaluationScreen2 from './components/EvalutionScreen';
import Congratulation from './components/congratulation';
import Passkey1 from './components/passkey1';
function App() {
  return (
    <>
      <Passkey1/>
      <LoginPage/>
      <SignUp/>
      <InstructionScreen/>
      <EvaluationScreen/>
      <Guideline/>
      <EvaluationScreen2/>
      <Congratulation/>
      <Toaster /> 
    </>
  )
}

export default App