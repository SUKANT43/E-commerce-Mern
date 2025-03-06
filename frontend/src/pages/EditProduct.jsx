import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  
  const [productName, setProductName] = useState(product.productName);
  const [productOriginalPrice, setProductOriginalPrice] = useState(product.productOriginalPrice);
  const [productOfferPrice, setProductOfferPrice] = useState(product.productOfferPrice);
  const [productCategory, setProductCategory] = useState(product.productCategory);
  const [productImage, setProductImage] = useState(product.productImage);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:2005/api/sellerProductUpload/products/${product._id}`,
        { productName, productOriginalPrice, productOfferPrice, productCategory, productImage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product Updated");
      navigate("/admin-view");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Edit Product</h2>

      <div>
        <label>Product Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div>
        <label>Original Price:</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={productOriginalPrice}
          onChange={(e) => setProductOriginalPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Offer Price:</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={productOfferPrice}
          onChange={(e) => setProductOfferPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </div>

      

      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleUpdate}>
        Update Product
      </button>
      <button className="bg-gray-500 text-white p-2 rounded ml-4" onClick={() => navigate("/admin-view")}>
        Cancel
      </button>
    </div>
  );
}

export default EditProduct;
