import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Like() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("You must be logged in to view liked products.");
      setLoading(false);
      return;
    }

    const fetchLikedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:2005/api/like/getLike", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length === 0) {
          setMessage("No liked products found.");
          setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
        } else {
          setLikedProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching liked products:", error);
        setMessage("Failed to fetch liked products.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [token, navigate]);

  const removeLikedProduct = async (productId) => {
    try {
      await axios.delete("http://localhost:2005/api/like/removeLike", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });

      setLikedProducts((prevProducts) =>
        prevProducts.filter((item) => item.productId !== productId)
      );

      if (likedProducts.length === 1) {
        setMessage("No liked products found.");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error removing liked product:", error);
      setMessage("Failed to remove product.");
    }
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-lg font-bold">
          Please log in to view liked products.
        </p>
      </div>
    );
  }

  if (loading) return <p className="text-center text-lg">Loading liked products...</p>;
  if (message) return <p className="text-center text-red-500">{message}</p>;

  return (
    <div className="p-6 bg-gray-100  min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Liked Products</h2>

        {likedProducts.length === 0 ? (
          <p className="text-center text-gray-600">No liked products found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Original Price</th>
                <th className="py-3 px-4">Offer Price</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {likedProducts.map((product) => (
                <tr key={product.productId} className="border-b">
                  <td className="py-4 px-4">
                    {product.productName.length > 20
                      ? `${product.productName.slice(0, 20)}...`
                      : product.productName}
                  </td>
                  <td className="py-4 px-4">
                    <img
                      src={product.productImage || "https://via.placeholder.com/100"}
                      alt={product.category}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4 line-through text-gray-500">${product.originalPrice}</td>
                  <td className="py-4 px-4 text-red-500 font-bold">${product.offerPrice}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => removeLikedProduct(product.productId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-between items-center mt-6">
          <button className="border px-4 py-2 rounded-lg cursor-pointer">
            <Link to="/">Return to Shop</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Like;
