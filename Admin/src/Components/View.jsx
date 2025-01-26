import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "./NavBar";

export function View() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5500/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially display all products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Function to delete a product
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5500/product/${productId}`)
        .then(() => {
          alert("Product deleted successfully");
          const updatedProducts = products.filter(
            (product) => product._id !== productId
          );
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts); // Update filtered products as well
        })
        .catch((error) => {
          alert("Error deleting product");
          console.error("Error deleting product:", error);
        });
    }
  };

  // Function to navigate to the edit page
  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`);
  };

  // Function to filter products by category
  const filterByCategory = (category) => {
    if (category) {
      setFilteredProducts(products.filter((product) => product.SelectCategory === category));
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>

        {/* Category Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => filterByCategory("")}
          >
            All
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => filterByCategory("Men")}
          >
            Men
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => filterByCategory("Women")}
          >
            Women
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={() => filterByCategory("Children")}
          >
            Children
          </button>
        </div>

        {/* Product List */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <center>
                <img
                  src={`http://localhost:5500/uploads/${product.Image}`}
                  alt={product.EnterProductName}
                  className="w-48 h-64 object-cover rounded-md mt-6 mb-6"
                  />
</center>

                <h2 className="font-semibold text-lg mb-2 text-center">
                  {product.EnterProductName}
                </h2>
                <p className="text-gray-600 text-sm text-center mb-2">
                  {product.EnterProductDescription}
                </p>
                <p className="text-gray-800 text-center mb-1">
                  Original Price: <span className="font-bold">${product.OriginalPrice}</span>
                </p>
                <p className="text-gray-800 text-center mb-3">
                  Offer Price: <span className="font-bold">${product.OfferPrice}</span>
                </p>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Category: {product.SelectCategory}
                </p>
                <div className="flex justify-between mt-auto">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
