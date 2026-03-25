
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/signuppage/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetails from "./pages/product/ProductDetails";



function App() {
  return(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App;
