import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Modal.css";

export default function AddSubCategoryModal({ close, refresh }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/category").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await API.post("/category/sub", { name, categoryId });
      refresh();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box small">
        <h3>Add SubCategory</h3>

        <select onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Subcategory name"
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleSubmit}>Add</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}