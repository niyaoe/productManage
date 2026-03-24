import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
        "http://localhost:5000/api/auth/login",
        form,
      );

      console.log(res.data);

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Optional: save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);

      // ✅ Show backend message
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* LEFT SIDE */}
        <div className="login-left">
          <h1>
            Sign In to <br /> Your Account
          </h1>

          <form onSubmit={handleSubmit}>
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

            <p className="forgot">Forgot password?</p>

            <button type="submit">SIGN IN</button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h1>Hello Friend!</h1>
          <p>Enter your personal details and start your journey with us</p>

          <button className="signup-btn" onClick={() => navigate("/signup")}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
