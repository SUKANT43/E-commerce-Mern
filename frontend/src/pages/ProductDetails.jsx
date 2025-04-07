import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaRegHeart, FaHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false); 

  const MAX_QUANTITY = 10;
  const token = localStorage.getItem("token");

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

    const checkIfLiked = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:2005/api/like/getLike", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const likedProducts = response.data;
        setIsLiked(likedProducts.some((item) => item.productId === id));
      } catch (err) {
        console.error("Error fetching liked products:", err);
      }
    };

    const checkIfInCart = async () => {
      if (!token) return;
      try {
        const response = await axios.post(
          "http://localhost:2005/api/cart/checkCart",
          { productId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsInCart(true);
      } catch (err) {
        setIsInCart(false); 
      }
    };

    fetchProduct();
    checkIfLiked();
    checkIfInCart();
  }, [id, token]);

  const handleLikeToggle = async () => {
    if (!token) {
      setMessage("You must be logged in to like items.");
      return;
    }

    try {
      if (isLiked) {
        await axios.delete("http://localhost:2005/api/like/removeLike", {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId: id },
        });

        setIsLiked(false);
        setMessage("Removed from wishlist.");
      } else {
        await axios.post(
          "http://localhost:2005/api/like/addLike",
          { productId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsLiked(true);
        setMessage("Added to wishlist.");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setMessage("Failed to update wishlist.");
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      setMessage("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const cartData = {
        productId: id,
        quantity,
        price: product.productOfferPrice,
      };

      const response = await axios.post(
        "http://localhost:2005/api/cart/addCart",
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 202) {
        setMessage("This product is already in your cart.");
      } else if (response.status === 201) {
        setMessage("Added to cart successfully!");
        setIsInCart(true);
      } else {
        setMessage("There was an error processing your request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add to cart");
    }
  };

  const handleRemoveFromCart = async () => {
    if (!token) {
      setMessage("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:2005/api/cart/deleteCart",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { cartId: id }, 
        }
      );

      if (response.status == 200) {
        setIsInCart(false); 
        setMessage("Removed from cart.");
      } else {
        setMessage("There was an error removing the item from the cart.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to remove from cart.");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center ">
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
<p className="text-gray-500 mt-1">
Discover our high-quality products, thoughtfully designed to meet your diverse needs. With a focus on durability, reliability, and customer satisfaction, each item is crafted to provide long-lasting value, making every purchase a smart and worthwhile investment.
</p>
<p className="text-gray-600 mt-2">{product.productDescription}</p>
          <p className="text-red-500 font-bold text-2xl mt-2">
            ${product.productOfferPrice}
          </p>
          <p className="text-gray-500 line-through">
            ${product.productOriginalPrice}
          </p>

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
              onClick={() => setQuantity((prev) => Math.min(MAX_QUANTITY, prev + 1))}
            >
              +
            </button>
          </div>

          <div className="flex mt-6 space-x-4">
            {!isInCart ? (
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleAddToCart}
              >
                <FaShoppingCart /> <span>Add to Cart</span>
              </button>
            ) : (
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-gray-400 text-white rounded-lg"
                onClick={handleRemoveFromCart}
              >
                <FaShoppingCart /> <span>Remove from Cart</span>
              </button>
            )}

            <button
              className="flex items-center space-x-2 px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-200"
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
              <span>Wishlist</span>
            </button>
          </div>

          {message && <p className="text-center text-blue-500 mt-4">{message}</p>}

          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709790.png"
                alt="Return Policy"
                className="w-12 h-12"
              />
              <p className="text-gray-600">
                7-day return policy for a hassle-free experience.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="Fast Delivery"
                className="w-12 h-12"
              />
              <p className="text-gray-600">
                Delivery within 2 days for fast and reliable shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
