import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2005/api/sellerProductUpload/getAllProducts"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "" || product.productCategory === selectedCategory) &&
      product.productOfferPrice <= priceRange
  );

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <h2 className="text-3xl font-bold text-center mb-6">Explore Our Products</h2>

      {/* Fixed Filter Button */}
      <div className="fixed top-5 right-8 z-10">
        <button onClick={() => setShowFilters(!showFilters)} className="p-2 bg-gray-200 rounded-full shadow">
          <FaFilter className="text-lg" />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute right-8 top-16 bg-white p-4 rounded-lg shadow-lg w-64">
          <select
            className="w-full p-2 border rounded-md mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphone">Headphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Speaker">Speaker</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
          <div className="flex flex-col">
            <label>Max Price: ${priceRange}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.productImage || "https://via.placeholder.com/150"}
              alt={product.productName}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.productName}</h3>
            <p className="text-gray-600">Category: {product.productCategory}</p>
            <p className="text-red-500 font-bold">${product.productOfferPrice}</p>
            <p className="text-gray-500 line-through">${product.productOriginalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
