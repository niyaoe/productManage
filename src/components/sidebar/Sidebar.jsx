import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="side-main-container">
      <h4>Categories</h4>

      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}

            {cat.subCategories && (
              <ul>
                {cat.subCategories.map((sub) => (
                  <li key={sub._id}>{sub.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}