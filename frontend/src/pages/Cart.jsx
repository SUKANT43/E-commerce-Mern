import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1, image: "monitor.png" },
    { id: 2, name: "H1 Gamepad", price: 550, quantity: 2, image: "gamepad.png" },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Subtotal</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10" />
                  {item.name}
                </td>
                <td className="py-4 px-4">${item.price}</td>
                <td className="py-4 px-4">
                  <select
                    className="border p-2 rounded"
                    value={item.quantity}
                    onChange={() => {}}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-4">${item.price * item.quantity}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="cursor-pointer"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          <button className="border px-4 py-2 rounded-lg cursor-pointer"><Link to="/">Return to Shop</Link></button>
        </div>

        <div className="mt-6 w-60 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Cart Total</h2>
          <p>Subtotal: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
          <p>Shipping: Free</p>
          <p className="font-bold">
            Total: $
            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </p>
          <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
