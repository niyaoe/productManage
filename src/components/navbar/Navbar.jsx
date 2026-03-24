import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Search:", search);
    // later connect API
  };

  return (
    <div className="nav-main-bar">
      <input
        type="text"
        placeholder="Search anything..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <div className="nav-right-section">
        <button className="logout-btn">Logout</button>
        <span>Cart 🛒</span>
      </div>
    </div>
  );
}