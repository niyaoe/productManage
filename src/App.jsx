
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/signuppage/Signup";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
