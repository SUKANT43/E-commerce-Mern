import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Havic HV G-92 Gamepad",
    price: "$192.00",
    stockStatus: "In Stock",
    rating: 4,
    reviews: 150,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",
    colors: ["White", "Black"],
    images: [

    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="flex p-6 gap-8">
      {/* Left Section: Images */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className="w-16 h-16 object-cover border cursor-pointer"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <img src={mainImage} alt="Main" className="w-96 h-96 object-cover" />
      </div>

      {/* Right Section: Product Details */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          <span>{"⭐".repeat(product.rating)}</span>
          <span className="text-gray-600">({product.reviews} Reviews)</span>
          <span className="text-green-500">{product.stockStatus}</span>
        </div>

        <p className="text-2xl font-bold text-red-500">{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* Color Selection */}
        <div className="mt-4">
          <h3 className="font-semibold">Colours:</h3>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer ${
                  selectedColor === color ? "border-2 border-black" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

     

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center gap-4">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Buy & Wishlist */}
        <div className="mt-4 flex gap-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            Add To Cart
          </button>
          <FaHeart className="text-gray-500 text-2xl cursor-pointer hover:text-red-500" />
        </div>

        {/* Delivery & Returns */}
        <div className="mt-6 border p-4 rounded-lg">
          <p className="font-semibold">🚚 Free Delivery</p>
          <p className="text-gray-600 text-sm">
            Enter your postal code for Delivery Availability
          </p>
          <hr className="my-2" />
          <p className="font-semibold">🔄 Return Delivery</p>
          <p className="text-gray-600 text-sm">
            Free 30 Days Delivery Returns. <a href="#">Details</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
