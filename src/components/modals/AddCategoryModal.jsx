import { useState } from "react";
import API from "../../services/api";
import "./Modal.css";

export default function AddCategoryModal({ close, refresh }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/category", { name });
      refresh();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box small">
        <h3>Add Category</h3>

        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button className="modal-btn" onClick={handleSubmit}>
            Add
          </button>
          <button className="modal-cancel" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
