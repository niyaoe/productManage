import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/navbar/Navbar";
import "./ProductDetails.css";
import EditProductModal from "../../components/modals/EditProductModal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
      setSelectedVariant(res.data.variants[0]);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      {/* 🔥 MODAL STYLE PAGE */}
      <div className="pd-overlay">
        <div className="pd-modal">
          {/* CLOSE */}
          <span className="pd-close" onClick={() => navigate(-1)}>
            ✖
          </span>

          {/* LEFT IMAGE */}
          <div className="pd-left">
            <div className="pd-img-box">
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt="product"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pd-right">
            <h2 className="pd-title">{product.name}</h2>

            <p className="pd-price">₹{selectedVariant?.price}</p>

            <p className="pd-desc">{product.description}</p>

            {/* VARIANTS */}
            <div className="pd-variant-section">
              <h4>Select RAM</h4>

              <div className="pd-variant-options">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    className={
                      selectedVariant === v ? "pd-variant active" : "pd-variant"
                    }
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.ram}
                  </button>
                ))}
              </div>
            </div>

            <p className="pd-qty">Available: {selectedVariant?.qty}</p>

            {/* ACTION BUTTONS */}
            <div className="pd-actions">
              <button className="pd-cart-btn">Buy Now</button>
              <button className="pd-wishlist-btn">❤️</button>
              <button className="pd-edit-btn" onClick={() => setShowEdit(true)}>
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
        {showEdit && (
          <EditProductModal
            product={product}
            close={() => setShowEdit(false)}
            refresh={fetchProduct}
          />
        )}
      </div>
    </>
  );
}
