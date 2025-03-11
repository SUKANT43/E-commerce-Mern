import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [minPrice, setMinPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:2005/api/userLogin/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserName(response.data.name);
          setIsLoggedIn(true);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      !searchQuery ||
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      selectedCategory === "" || product.productCategory === selectedCategory;

    const priceMatch =
      product.productOfferPrice <= priceRange &&
      product.productOfferPrice >= minPrice;

    return searchMatch && categoryMatch && priceMatch;
  });

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative mt-25">
      <h2 className="text-4xl font-bold text-center mb-8">
        Explore Our Products
      </h2>

      <div className="fixed top-8 right-8 z-10 flex items-center space-x-4">
        {isLoggedIn && <span className="font-semibold text-lg">Welcome, {userName}</span>}
        <button
          onClick={handleAuthClick}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow flex items-center space-x-2"
        >
          <p className="font-semibold">{isLoggedIn ? "Logout" : "Login"}</p>
          <FaUser className="text-lg" />
        </button>
      </div>

      <div className="fixed top-35 right-8 z-10">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow flex items-center space-x-2"
        >
          <p className="font-semibold">Filter</p>
          <FaFilter className="text-lg" />
        </button>
      </div>

      {showFilters && (
        <div className=" right-8 top-16 bg-white p-4 rounded-lg shadow-lg w-64 z-100 fixed mt-30">
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

          <div className="flex flex-col mb-3">
            <label>Min Price: ${minPrice}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label>Max Price: ${priceRange}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={product.productImage || "https://via.placeholder.com/150"}
              alt={product.productName}
              className="w-full h-80 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {product.productName.length > 30
                ? product.productName.substring(0, 30) + "..."
                : product.productName}
            </h3>

            <p className="text-gray-600">Category: {product.productCategory}</p>
            <p className="text-red-500 font-bold mt-2">
              ${product.productOfferPrice}
            </p>
            <p className="text-gray-500 line-through mt-1">
              ${product.productOriginalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
