import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminView() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:2005/api/sellerProduct/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:2005/api/sellerProduct/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditForm = (product) => {
    setEditProduct(product);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2005/api/sellerProduct/products/${editProduct._id}`, editProduct);
      setProducts(products.map((p) => (p._id === editProduct._id ? editProduct : p)));
      setEditProduct(null);
      setMessage("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Products</h2>

        {message && <p className="text-green-600">{message}</p>}

        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Original Price</th>
                <th className="border p-2">Offer Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="border p-2">
                      <img src={product.productImage} alt={product.productName} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="border p-2">{product.productName}</td>
                    <td className="border p-2">${product.productOriginalPrice}</td>
                    <td className="border p-2">${product.productOfferPrice}</td>
                    <td className="border p-2">{product.productCategory}</td>
                    <td className="border p-2">
                      <button onClick={() => openEditForm(product)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-600">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="productName"
                value={editProduct.productName}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Product Name"
              />
              <input
                type="number"
                name="productOriginalPrice"
                value={editProduct.productOriginalPrice}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Original Price"
              />
              <input
                type="number"
                name="productOfferPrice"
                value={editProduct.productOfferPrice}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
                placeholder="Offer Price"
              />
              <select
                name="productCategory"
                value={editProduct.productCategory}
                onChange={handleEditChange}
                className="w-full p-2 border rounded"
              >
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
                <option value="Headphone">Headphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Speaker">Speaker</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Save Changes</button>
            </form>
            <button onClick={() => setEditProduct(null)} className="mt-2 w-full bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;
