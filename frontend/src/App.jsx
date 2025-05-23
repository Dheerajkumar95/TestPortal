import './App.css';
import "./css/style.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route,Navigate  } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/UserDetails";
import LoginPage from './components/LoginPage';
import SignUp from './components/signUp';
import Welcome from './components/Welcome';
import InstructionScreen from './components/instruction';
import EvaluationScreen from './components/evalutionScreen';
import ForgotPassword from './components/ForgotPassword';
import Guideline from './components/guideline';
import Congratulation from './components/congratulation';
import Passkey from './components/passkey';
import VerificationPage from './components/VerificationPage';
import QuizPage from './components/QuizPage';
import ResetPassword from "./components/ResetPassword";
import { useAuthStore } from "./store/useAuthStore";
function App() {
   const { authUser,checkAuth} = useAuthStore();
   
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Welcome /> : <Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wel/user-details" element={<UserDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wel" element={<Welcome />} />
        <Route path="/wel/passkey" element={<Passkey />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/instructions" element={<InstructionScreen />} />
        <Route path="/evaluation" element={<EvaluationScreen />} />
        <Route path="/guideline" element={<Guideline />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/congratulations" element={<Congratulation />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;