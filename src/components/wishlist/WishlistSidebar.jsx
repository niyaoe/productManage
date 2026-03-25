import { useEffect, useState } from "react";
import API from "../../services/api";
import "./WishlistSidebar.css";

export default function WishlistSidebar({ open, close }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open) fetchWishlist();
  }, [open]);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.post("/wishlist", { productId: id });
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {open && <div className="wish-overlay" onClick={close}></div>}

      <div className={`wish-sidebar ${open ? "open" : ""}`}>
        <div className="wish-header">
          <h3>My Wishlist</h3>
          <span className="wish-close" onClick={close}>✖</span>
        </div>

        <div className="wish-list">
          {products.length === 0 ? (
            <p className="wish-empty">No items in wishlist</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="wish-item">
                <img src={p.image} alt="" />

                <div className="wish-info">
                  <p className="wish-name">{p.name}</p>
                  <span className="wish-price">
                    ₹{p.variants?.[0]?.price}
                  </span>
                </div>

                <button
                  className="wish-remove"
                  onClick={() => removeItem(p._id)}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}