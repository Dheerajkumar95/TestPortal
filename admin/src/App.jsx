import './App.css';
import "./css/style.css";
import "./css/question.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/login';
import Dashboard from './components/dasboard'; 
import UserTable from './components/userTable'; 
import QuestionAdd from './components/QuestionaAdd';
import AddPasskey from './components/AddPasskey';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-question" element={<QuestionAdd/>} />
        <Route path="/add-passkey" element={<AddPasskey />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </>
  );
}

export default App;