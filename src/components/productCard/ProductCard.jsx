import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="prod-card-container">
      <img
        src={product.image || "https://via.placeholder.com/120"}
        alt="product"
      />

      <h4>{product.name}</h4>

      <p>₹{product.variants?.[0]?.price}</p>

      <div className="prod-stars">★★★★★</div>
    </div>
  );
}