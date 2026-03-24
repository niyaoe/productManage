import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Sidebar.css";

export default function Sidebar({ onSelectSub }) {
  const [categories, setCategories] = useState([]);
  const [openCat, setOpenCat] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubClick = (subId) => {
    setSelectedSub(subId);
    onSelectSub(subId); // 🔥 send to dashboard
  };

  return (
    <div className="side-main-container">
      <h4>Categories</h4>

      <ul>
        <li onClick={() => handleSubClick(null)}>All categories</li>

        {categories.map((cat) => (
          <li key={cat._id}>
            <div
              className="cat-title"
              onClick={() =>
                setOpenCat(openCat === cat._id ? null : cat._id)
              }
            >
              {cat.name} <span>⌄</span>
            </div>

            {openCat === cat._id && (
              <ul className="sub-list">
                {cat.subCategories.map((sub) => (
                  <li
                    key={sub._id}
                    className={
                      selectedSub === sub._id ? "active-sub" : ""
                    }
                    onClick={() => handleSubClick(sub._id)}
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}