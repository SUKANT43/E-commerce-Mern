import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetching cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:2005/api/cart/getCart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        setMessage("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle quantity change
  const handleQuantityChange = async (cartId, newQuantity) => {
    try {
      const response = await axios.put(
        "http://localhost:2005/api/cart/editCart",
        { cartId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity, subTotal: item.price * newQuantity } : item
        )
      );
    } catch (error) {
      setMessage("Failed to update cart item");
    }
  };

  // Handle remove item from cart
  const handleRemoveItem = async (cartId) => {
    try {
      const response = await axios.delete("http://localhost:2005/api/cart/deleteCart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { cartId },
      });
      setMessage(response.data.message);
      setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
    } catch (error) {
      setMessage("Failed to delete cart item");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-30">
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
              <tr key={item.cartId} className="border-b">
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={item.productImage} alt={item.productName} className="w-10 h-10" />
                  {item.productName}
                </td>
                <td className="py-4 px-4">${item.price}</td>
                <td className="py-4 px-4">
                  <select
                    className="border p-2 rounded"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.cartId, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-4">${item.subTotal}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleRemoveItem(item.cartId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="cursor-pointer" />
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
          <p>Subtotal: ${cartItems.reduce((acc, item) => acc + item.subTotal, 0)}</p>
          <p>Shipping: Free</p>
          <p className="font-bold">
            Total: ${cartItems.reduce((acc, item) => acc + item.subTotal, 0)}
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
