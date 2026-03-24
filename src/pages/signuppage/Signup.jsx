import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
      );

      console.log(res.data);

      alert("Signup successful");

      // ✅ Redirect to login page
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);

      // ✅ Show backend message if exists
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* LEFT SIDE */}
        <div className="signup-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>

          <button className="signin-btn" onClick={() => navigate("/")}>
            SIGN IN
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <h1>Create Account</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
}
