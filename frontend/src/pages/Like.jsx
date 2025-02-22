import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Like() {
  // Sample cart items state
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1, image: "/images/lcd-monitor.png" },
    { id: 2, name: "H1 Gamepad", price: 550, quantity: 2, image: "/images/gamepad.png" },
  ]);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Liked Products</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Subtotal</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="py-4 px-4">${item.price}</td>
                <td className="py-4 px-4">
                  <span className="border px-3 py-1 rounded-lg bg-gray-100">{item.quantity}</span>
                </td>
                <td className="py-4 px-4">${item.price * item.quantity}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Return to Shop Button */}
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
