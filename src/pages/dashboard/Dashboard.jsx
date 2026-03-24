import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ProductCard from "../../components/productCard/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import API from "../../services/api";

// ✅ import modals
import AddCategoryModal from "../../components/modals/AddCategoryModal";
import AddSubCategoryModal from "../../components/modals/AddSubCategoryModal";
import AddProductModal from "../../components/modals/AddProductModal";

import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);

  // ✅ modal states
  const [showCat, setShowCat] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showProd, setShowProd] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedSub]);

  // ✅ fetch products
  const fetchProducts = async () => {
    try {
      let url = "/products";

      if (selectedSub) {
        url += `?subCategory=${selectedSub}`;
      }

      const res = await API.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash-main-container">
      <Navbar />

      <div className="dash-body-container">
        <Sidebar onSelectSub={setSelectedSub} />

        <div className="dash-content-area">
          {/* 🔥 ACTION BUTTONS */}
          <div className="dash-action-bar">
            <button onClick={() => setShowCat(true)}>Add Category</button>
            <button onClick={() => setShowSub(true)}>Add SubCategory</button>
            <button onClick={() => setShowProd(true)}>Add Product</button>
          </div>

          {/* 🧱 PRODUCTS */}
          <div className="dash-product-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 MODALS */}
      {showCat && (
        <AddCategoryModal
          close={() => setShowCat(false)}
          refresh={fetchProducts}
        />
      )}

      {showSub && (
        <AddSubCategoryModal
          close={() => setShowSub(false)}
          refresh={fetchProducts}
        />
      )}

      {showProd && (
        <AddProductModal
          close={() => setShowProd(false)}
          refresh={fetchProducts}
        />
      )}
    </div>
  );
}