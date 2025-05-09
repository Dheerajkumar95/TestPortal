import './App.css';
import "./css/style.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/login';
import Dashboard from './components/dasboard'; 
import UserTable from './components/userTable'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </>
  );
}

export default App;