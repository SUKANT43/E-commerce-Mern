import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    EnterProductName: "",
    EnterProductDescription: "",
    OriginalPrice: "",
    OfferPrice: "",
    SelectCategory: "",
    Image: "",
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Fetch product data
    axios
      .get(`http://localhost:5500/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("EnterProductName", product.EnterProductName);
    formData.append("EnterProductDescription", product.EnterProductDescription);
    formData.append("OriginalPrice", product.OriginalPrice);
    formData.append("OfferPrice", product.OfferPrice);
    formData.append("SelectCategory", product.SelectCategory);
    if (newImage) {
      formData.append("Image", newImage);
    }
  
    try {
      await axios.put(`http://localhost:5500/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate("/viewProducts"); // Redirect to the product list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }

  };
  

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <input
          type="text"
          name="EnterProductName"
          value={product.EnterProductName}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md"
          placeholder="Product Name"
        />
        <input
          type="text"
          name="EnterProductDescription"
          value={product.EnterProductDescription}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md"
          placeholder="Product Description"
        />
        <input
          type="number"
          name="OriginalPrice"
          value={product.OriginalPrice}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md"
          placeholder="Original Price"
        />
        <input
          type="number"
          name="OfferPrice"
          value={product.OfferPrice}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md"
          placeholder="Offer Price"
        />
        <select
          name="SelectCategory"
          value={product.SelectCategory}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Children">Children</option>
        </select>
        <input type="file" onChange={handleImageChange} className="w-full p-3 border rounded-md" />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}
