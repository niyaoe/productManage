import { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({onWishlist}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Search:", search);
    // later connect API
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="nav-main-bar">
      <input
        type="text"
        placeholder="Search anything..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <div className="nav-right-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <button className="wish-btn" onClick={onWishlist}>
          ❤️
        </button>
      </div>
    </div>
  );
}
