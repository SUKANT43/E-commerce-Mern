import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:2005/api/sellerProductUpload/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data.products && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setError("Invalid data format from API");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:2005/api/sellerProductUpload/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
      alert("Product Deleted");
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit/${product._id}`, { state: product });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="shadow-lg p-4 relative bg-white">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-80 object-cover rounded"
                />
                <div className="mt-4">
<h3 className="text-xl font-semibold">
  {product.productName.length > 20
    ? `${product.productName.slice(0, 20)}...`
    : product.productName}
</h3>
                  <p className="text-gray-700">Original Price: ${product.productOriginalPrice}</p>
                  <p className="text-green-600">Offer Price: ${product.productOfferPrice}</p>
                  <p className="text-gray-500">Category: {product.productCategory}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No products found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminView;