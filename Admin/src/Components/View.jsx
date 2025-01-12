import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from './NavBar';

export function View() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from the backend
    useEffect(() => {
        axios.get('http://localhost:5500/products')
            .then(response => {
                setProducts(response.data);  // Set the products state with the fetched data
                setLoading(false);            // Stop loading when data is fetched
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);            // Stop loading in case of error
            });
    }, []);

    // Function to delete a product
    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:5500/product/${productId}`)
                .then(response => {
                    alert("Product deleted successfully");
                    setProducts(products.filter(product => product._id !== productId));  // Remove the deleted product from the list
                })
                .catch((error) => {
                    alert("Error deleting product");
                    console.error("Error deleting product:", error);
                });
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen">
            <NavBar />
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Product List</h1>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                                <img
                                    src={`http://localhost:5500/uploads/${product.Image}`}
                                    alt={product.EnterProductName}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold text-indigo-700">{product.EnterProductName}</h2>
                                <p className="text-gray-600">{product.EnterProductDescription}</p>
                                <p className="mt-2 text-green-600">₹ {product.OfferPrice}</p>
                                <p className="line-through text-gray-400">₹ {product.OriginalPrice}</p>
                                <p className="mt-2 text-gray-500">Category: {product.SelectCategory}</p> {/* Added category here */}
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="mt-4 w-full p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
