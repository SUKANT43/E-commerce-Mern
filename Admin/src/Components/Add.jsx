import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavBar } from './NavBar';

export function Add() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");  // State to hold the selected category

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);  // Update category state when selected
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with category:", category);
        // Handle form submission logic
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
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Product Description"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Original Price"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Offer Price"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Category Dropdown */}
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
                                src={image}
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
