import React, { useState } from "react";
import { FaFilter, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(500);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ["Mobile", "Laptop", "Headphones", "Tablet", "Home Appliances"];

  const products = [
    {
      id: 1,
      name: "Breed Dry Dog Food",
      price: 100,
      rating: 3,
      reviews: 35,
      image: "/images/dog-food.png",
      category: "Home Appliances",
    },
    {
      id: 2,
      name: "CANON EOS DSLR Camera",
      price: 360,
      rating: 5,
      reviews: 95,
      image: "/images/canon-camera.png",
      category: "Mobile",
    },
    {
      id: 3,
      name: "ASUS FHD Gaming Laptop",
      price: 700,
      rating: 5,
      reviews: 325,
      image: "/images/asus-laptop.png",
      category: "Laptop",
    },
    {
      id: 4,
      name: "Curology Product Set",
      price: 500,
      rating: 4,
      reviews: 145,
      image: "/images/curology-set.png",
      category: "Home Appliances",
    },
    {
      id: 5,
      name: "Kids Electric Car",
      price: 960,
      rating: 5,
      reviews: 65,
      image: "/images/electric-car.png",
      category: "Home Appliances",
    },
    {
      id: 6,
      name: "Jr. Zoom Soccer Cleats",
      price: 1160,
      rating: 5,
      reviews: 35,
      image: "/images/soccer-cleats.png",
      category: "Tablet",
    },
    {
      id: 7,
      name: "GP11 Shooter USB Gamepad",
      price: 660,
      rating: 4,
      reviews: 55,
      image: "/images/gamepad.png",
      category: "Headphones",
    },
    {
      id: 8,
      name: "Quilted Satin Jacket",
      price: 660,
      rating: 4,
      reviews: 55,
      image: "/images/jacket.png",
      category: "Home Appliances",
    },
  ];

  const navigate = useNavigate();

  // Handle filter application
  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice = product.price <= price;
      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
    setShowFilter(false); // Close filter after applying
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setPrice(500);
    setFilteredProducts(products);
  };

  // Handle product click
  const handleClick = (productId) => {
    navigate(`/product-page/${productId}`);
  };

  // Display products (filtered or all)
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="p-6 relative">
      {/* Filter Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300"
        >
          <FaFilter className="text-gray-700" />
          <span className="text-gray-700 font-semibold">Filter</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilter && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg w-64 z-10">
          <h2 className="text-lg font-bold mb-2">Filter Options</h2>

          {/* Product Category */}
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Product Category</h3>
            <select
              className="w-full border p-2 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Price Range: ${price}</h3>
            <input
              type="range"
              min="100"
              max="2000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-red-500 text-white py-2 rounded-md mb-2"
          >
            Apply Filters
          </button>

          {/* Reset Filter Button */}
          <button
            onClick={resetFilters}
            className="w-full bg-gray-500 text-white py-2 rounded-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Home Page Content */}
      <div className="mt-16 text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Our Store</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md relative cursor-pointer"
              onClick={() => handleClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-red-500">${product.price}</p>
              <p className="text-sm text-gray-600">
                {Array(product.rating).fill("⭐").join("")} ({product.reviews})
              </p>

              {/* Buttons and Icons */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <FaHeart className="text-gray-500 cursor-pointer hover:text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md"
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default Home;