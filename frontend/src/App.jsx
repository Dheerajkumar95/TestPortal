import './App.css';
import "./css/style.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignUp from './components/signUp';
import InstructionScreen from './components/instruction';
import EvaluationScreen from './components/evalutionScreen';
 
import Guideline from './components/guideline';
import Congratulation from './components/congratulation';
import Passkey from './components/passkey';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Passkey />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/instructions" element={<InstructionScreen />} />
        <Route path="/evaluation" element={<EvaluationScreen />} />
         
        <Route path="/guideline" element={<Guideline />} />
        <Route path="/congratulations" element={<Congratulation />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;