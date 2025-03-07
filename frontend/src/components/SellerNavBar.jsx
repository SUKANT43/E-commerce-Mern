import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaBoxOpen, FaChevronRight, FaChevronLeft, FaSignOutAlt } from "react-icons/fa";
import icon from "../assets/c&c.png";

function SellerNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/seller-login"); 
  };

  return (
    <div className="m-0">
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src={icon} className="w-16 h-16" alt="Logo" />
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-800">Click & Collect</h1>
          <h1 className="text-2xl font-bold text-gray-700 ml-105">Seller Dashboard</h1>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-red-600 hover:text-red-800 text-lg font-semibold"
        >
          <FaSignOutAlt className="text-2xl" /> Logout
        </button>
      </div>

      <div 
        className="fixed top-24 left-0 z-50 text-3xl p-3 cursor-pointer bg-gray-800 text-white rounded-r-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </div>

      <div className={`fixed top-22 left-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
        <nav className="flex flex-col mt-24 text-lg font-semibold text-gray-700">
          <Link to="/admin-add-product" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-200">
            <FaPlus /> Add Product
          </Link>
          <Link to="/admin-view" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-200">
            <FaBoxOpen /> View Product
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SellerNavBar;
