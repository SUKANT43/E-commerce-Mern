import React, { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import icon from "../assets/c&c.png"; 
import { Link } from "react-router-dom";
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="m-0">
      <div className="w-full bg-black text-slate-300 text-center py-2 fixed top-0 left-0 z-50 text-sm md:text-base">
        <p>
          Summer Sale For All Products and Free Delivery - Upto 50% OFF!
          <span className="text-white font-bold ml-2 underline cursor-pointer">ShopNow</span>
        </p>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-0 shadow-md mt-12 relative">
        <div className="flex items-center gap-3">
          <img src={icon} className="w-14 h-14 md:w-20 md:h-20 cursor-pointer" alt="Logo" />
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-gray-800 cursor-pointer">C&C</h1>
        </div>

        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex gap-8 text-lg font-semibold px-4 md:px-0 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
          <Link to="/" className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">Home</Link>
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">Contact</h1>
          <h1 className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">About</h1>
          <Link to="/user-login" className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">User Sign In</Link>
          <Link to="/seller-login" className="cursor-pointer px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white">Seller Sign In</Link>



        </div>

        <div className="hidden md:flex items-center border border-gray-300 rounded-lg px-4 py-2 w-64 md:w-80 lg:w-96 ml-[-40px]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="outline-none px-2 py-1 w-full"
          />
          <FaSearch className="text-gray-500 ml-2 cursor-pointer" />
        </div>

        <div className="hidden md:flex items-center gap-6 md:gap-8 text-xl md:text-2xl">
         <Link to="/like"><FaHeart className="text-red-500 cursor-pointer" /></Link> 
          <Link to="/cart"><FaShoppingCart className="text-blue-500 cursor-pointer" /></Link>
          
          <FaUserCircle className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
