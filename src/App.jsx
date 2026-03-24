
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/signuppage/Signup";

function App() {
  return(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
