import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios'; // For making API requests

export function Add() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [category, setCategory] = useState(""); // Category state
    const [image, setImage] = useState(null); // For storing selected file

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Save the file object to state
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !productDescription || !originalPrice || !offerPrice || !category || !image) {
            alert("Please fill in all fields.");
            return;
        }

        // Create a FormData object to send text and file data
        const formData = new FormData();
        formData.append("EnterProductName", productName);
        formData.append("EnterProductDescription", productDescription);
        formData.append("OriginalPrice", originalPrice);
        formData.append("OfferPrice", offerPrice);
        formData.append("SelectCategory", category);
        formData.append("Image", image);

        try {
            const response = await axios.post("http://localhost:5500/data", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Server response:", response.data);
            alert("Product added successfully!");
           setProductName("")
           setProductDescription("")
           setOfferPrice("")
           setOriginalPrice("")
           setCategory("")
           setImage("")
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen">
            <NavBar />
            <div className="flex flex-col items-center justify-center p-6 mt-6">
                <h1 className="text-2xl font-semibold mb-4 text-indigo-800">Add New Product</h1>

                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Product Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Original Price"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Offer Price"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="w-full">
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                            Select Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Children">Children</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Selected Product"
                                className="mt-4 h-40 w-40 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
