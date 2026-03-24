import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ProductCard from "../../components/productCard/ProductCard";
import API from "../../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash-main-container">
      <Navbar />

      <div className="dash-body-container">
        <Sidebar />

        <div className="dash-content-area">
          {/* ACTION BUTTONS */}
          <div className="dash-action-bar">
            <button>Add Category</button>
            <button>Add SubCategory</button>
            <button>Add Product</button>
          </div>

          {/* PRODUCTS */}
          <div className="dash-product-grid">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="dash-pagination">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}