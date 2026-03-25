import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="prod-card-container"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="prod-img-wrapper">
        <img
          src={product.image || "https://via.placeholder.com/120"}
          alt="product"
        />
      </div>

      <h4 className="prod-title">{product.name}</h4>

      <p className="prod-price">
        ₹{product.variants?.[0]?.price}
      </p>

      <div className="prod-bottom">
        <span className="prod-rating">★★★★★</span>
      </div>
    </div>
  );
}