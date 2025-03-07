import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex flex-col items-center mt-20">
          <img
            src={product.productImage || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="w-80 object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold">{product.productName}</h2>
          <p className="text-gray-600 mt-2">{product.productDescription}</p>
          <p className="text-gray-500 mt-2">This product is crafted with high-quality materials, ensuring exceptional durability, style, and comfort. Designed to meet your everyday needs, it combines functionality with elegance, making it a perfect choice for any occasion. Whether for personal use or as a thoughtful gift, this product guarantees reliability and satisfaction.</p>
          <p className="text-red-500 font-bold text-2xl mt-2">${product.productOfferPrice}</p>
          <p className="text-gray-500 line-through">${product.productOriginalPrice}</p>

          <div className="mt-6 flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <div className="flex mt-6 space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <FaShoppingCart /> <span>Add to Cart</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-200">
              <FaRegHeart /> <span>Wishlist</span>
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709790.png"
                alt="Return Policy"
                className="w-12 h-12"
              />
              <p className="text-gray-600">7-day return policy for a hassle-free experience.</p>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="Fast Delivery"
                className="w-12 h-12"
              />
              <p className="text-gray-600">Delivery within 2 days for fast and reliable shipping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
