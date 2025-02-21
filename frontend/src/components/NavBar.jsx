import React from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import icon from "../assets/c&c.png"; // Ensure the file exists

function NavBar() {
  return (
    <div className="m-0">
      <div className="w-full bg-black text-slate-300 text-center py-2 fixed top-0 left-0 z-50">
        <p>
          Summer Sale For All Products and Free Delivery - Upto 50% OFF!
          <span className="text-white font-bold ml-2 underline cursor-pointer">ShopNow</span>
        </p>
      </div>

      <div className="flex items-center justify-between px-6  shadow-md mt-12">
        <div className="flex items-center gap-3">
          <img src={icon} className="w-20 h-20" alt="Logo" />
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-800">C&C</h1>
        </div>

        <div className="flex gap-8 text-lg font-semibold">
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">
            Home
          </h1>
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">
            Contact
          </h1>
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">
            About
          </h1>
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">
            Sign In
          </h1>
        </div>

        
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-96 ml-[-40px]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="outline-none px-2 py-1 w-full"
          />
          <FaSearch className="text-gray-500 ml-2 cursor-pointer" />
        </div>

        <div className="flex items-center gap-8 text-2xl">
          <FaHeart className="text-red-500 cursor-pointer" />
          <FaShoppingCart className="text-blue-500 cursor-pointer" />
          <FaUserCircle className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
