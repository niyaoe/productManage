import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Modal.css";

export default function EditProductModal({ product, close, refresh }) {
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setVariants(product.variants || []);
    }
  }, [product]);

  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: "" }]);
  };

  const handleSubmit = async () => {
    try {
      await API.put(`/products/${product._id}`, {
        name,
        variants,
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

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />

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
          </div>
        ))}

        <button className="add-variant-btn" onClick={addVariant}>
          + Add Variant
        </button>

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