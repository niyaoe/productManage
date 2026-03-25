import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Modal.css";

export default function EditProductModal({ product, close, refresh }) {
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setVariants(product.variants || []);
      setPreview(product.image);
      setImage(product.image);
      setSubCategory(product.subCategory?._id);
    }

    // fetch categories
    API.get("/category").then((res) => setCategories(res.data));
  }, [product]);

  // 🖼️ IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔄 VARIANT CHANGE
  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  // ➕ ADD VARIANT
  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: "" }]);
  };

  // ❌ DELETE VARIANT
  const deleteVariant = (i) => {
    const updated = variants.filter((_, index) => index !== i);
    setVariants(updated);
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    try {
      await API.put(`/products/${product._id}`, {
        name,
        subCategory,
        variants,
        image,
      });

      refresh();
      close();
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>Edit Product</h3>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />

        {/* SUBCATEGORY */}
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option>Select SubCategory</option>
          {categories.map((c) =>
            c.subCategories.map((s) => (
              <option key={s._id} value={s._id}>
                {c.name} - {s.name}
              </option>
            ))
          )}
        </select>

        {/* IMAGE */}
        <input type="file" accept="image/*" onChange={handleImage} />

        {preview && (
          <img src={preview} alt="preview" className="preview-img" />
        )}

        {/* VARIANTS */}
        {variants.map((v, i) => (
          <div key={i} className="variant-row">
            <input
              value={v.ram}
              onChange={(e) =>
                handleVariantChange(i, "ram", e.target.value)
              }
              placeholder="RAM"
            />

            <input
              value={v.price}
              onChange={(e) =>
                handleVariantChange(i, "price", e.target.value)
              }
              placeholder="Price"
            />

            <input
              value={v.qty}
              onChange={(e) =>
                handleVariantChange(i, "qty", e.target.value)
              }
              placeholder="Qty"
            />

            {/* ❌ DELETE */}
            <button
              className="variant-delete-btn"
              onClick={() => deleteVariant(i)}
            >
              ✖
            </button>
          </div>
        ))}

        <button className="add-variant-btn" onClick={addVariant}>
          + Add Variant
        </button>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="modal-btn" onClick={handleSubmit}>
            Update
          </button>
          <button className="modal-cancel" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}