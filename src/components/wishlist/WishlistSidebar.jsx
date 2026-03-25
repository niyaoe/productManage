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
      await API.post("/wishlist", { productId: id }); // toggle remove
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
          <h3>Wishlist</h3>
          <span onClick={close}>✖</span>
        </div>

        <div className="wish-list">
          {products.length === 0 ? (
            <p>No items</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="wish-item">
                <img src={p.image} alt="" />

                <div className="wish-info">
                  <p>{p.name}</p>
                  <span>₹{p.variants?.[0]?.price}</span>
                </div>

                <button onClick={() => removeItem(p._id)}>❌</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}