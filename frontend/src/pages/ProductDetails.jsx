import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2005/api/sellerProductUpload/getProduct/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.productImage || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="w-full object-cover rounded"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold">{product.productName}</h2>
          <p className="text-gray-600 mt-2">{product.productDescription}</p>
          <p className="text-red-500 font-bold text-xl mt-2">${product.productOfferPrice}</p>
          <p className="text-gray-500 line-through">${product.productOriginalPrice}</p>

          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex mt-6 space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              <FaShoppingCart /> <span>Add to Cart</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200">
              <FaRegHeart /> <span>Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
