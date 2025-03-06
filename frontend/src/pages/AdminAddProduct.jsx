import React, { useState } from "react";
import axios from "axios";

function AdminAddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productOriginalPrice: "",
    productOfferPrice: "",
    productCategory: "Laptop",
    productImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, productImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const { productName, productOriginalPrice, productOfferPrice, productCategory, productImage } = formData;
    if (!productName || !productOriginalPrice || !productOfferPrice || !productCategory || !productImage) {
      return "All fields are required!";
    }
    if (Number(productOriginalPrice) <= 0 || Number(productOfferPrice) <= 0) {
      return "Price and Offer Price must be positive!";
    }
    if (Number(productOfferPrice) > Number(productOriginalPrice)) {
      return "Offer Price cannot be greater than Original Price!";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    setLoading(true);
    setMessage("");

    const productData = new FormData();
    productData.append("productName", formData.productName);
    productData.append("productOriginalPrice", formData.productOriginalPrice);
    productData.append("productOfferPrice", formData.productOfferPrice);
    productData.append("productCategory", formData.productCategory);
    productData.append("productImage", formData.productImage); // ✅ FIXED IMAGE FIELD NAME

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication failed! Please log in.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:2005/api/sellerProductUpload/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Product uploaded successfully!");
      setFormData({
        productName: "",
        productOriginalPrice: "",
        productOfferPrice: "",
        productCategory: "Laptop",
        productImage: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage(error.response?.data?.error || "Error uploading product. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-2xl rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter product name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="productOriginalPrice" className="block text-gray-700">Original Price</label>
            <input
              type="number"
              id="productOriginalPrice"
              name="productOriginalPrice"
              value={formData.productOriginalPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter original price"
            />
          </div>
          <div>
            <label htmlFor="productOfferPrice" className="block text-gray-700">Offer Price</label>
            <input
              type="number"
              id="productOfferPrice"
              name="productOfferPrice"
              value={formData.productOfferPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter offer price"
            />
          </div>
        </div>

        <div>
          <label htmlFor="productCategory" className="block text-gray-700">Category</label>
          <select
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphone">Headphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Speaker">Speaker</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Product Image</label>
          <div className="border border-gray-300 p-4 rounded-lg text-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            ) : (
              <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-400 rounded-md">
                <span className="text-gray-500">Upload an image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mt-2 p-2 border rounded cursor-pointer" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Uploading..." : "ADD"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
