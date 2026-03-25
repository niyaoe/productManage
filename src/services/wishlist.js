import API from "./api";

// ❤️ toggle
export const toggleWishlist = (productId) =>
  API.post("/wishlist", { productId });

// 📥 get wishlist
export const getWishlist = () =>
  API.get("/wishlist");