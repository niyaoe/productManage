import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Modal.css";

export default function AddProductModal({ close, refresh }) {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([
    { ram: "", price: "", qty: "" },
  ]);

  useEffect(() => {
    API.get("/category").then((res) => setCategories(res.data));
  }, []);

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: "" }]);
  };

  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    try {
      await API.post("/products", {
        name,
        subCategory,
        variants,
      });

      refresh();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>Add Product</h3>

        <input
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
        />

        <select onChange={(e) => setSubCategory(e.target.value)}>
          <option>Select SubCategory</option>
          {categories.map((c) =>
            c.subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {c.name} - {s.name}
              </option>
            ))
          )}
        </select>

        {/* VARIANTS */}
        {variants.map((v, i) => (
          <div key={i} className="variant-row">
            <input placeholder="RAM" onChange={(e) => handleVariantChange(i, "ram", e.target.value)} />
            <input placeholder="Price" onChange={(e) => handleVariantChange(i, "price", e.target.value)} />
            <input placeholder="Qty" onChange={(e) => handleVariantChange(i, "qty", e.target.value)} />
          </div>
        ))}

        <button onClick={addVariant}>+ Add Variant</button>

        <button onClick={handleSubmit}>Add Product</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}