import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import icon from "../assets/c&c.png"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function NavBar({ setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState(""); 
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        
        if (storedToken) {
          const response = await axios.get("http://localhost:2005/api/userLogin/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
    };

    fetchUserData();
  }, [token]); // Add token as dependency

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserName("");
    toast.success("Logged out successfully");
    navigate("/user-login");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchQuery(value); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm m">
      {/* Announcement Bar */}
      <div className="w-full bg-black text-slate-300 text-center py-2 text-sm md:text-base">
        <p>
          Summer Sale For All Products and Free Delivery - Upto 50% OFF!
          <span className="text-white font-bold ml-2 underline cursor-pointer hover:text-amber-300 transition-colors">
            Shop Now
          </span>
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <img src={icon} className="w-12 h-12 md:w-16 md:h-16" alt="C&C Logo" />
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wide text-gray-800">C&C</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none md:flex items-center gap-6 text-lg font-medium px-4 py-3 md:py-0 transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}`}>
          <Link 
            to="/" 
            className="block md:inline-block px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className="block md:inline-block px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className="block md:inline-block px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          {!token && (
            <Link 
              to="/user-login" 
              className="block md:inline-block px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-lg px-4 py-2 flex-1 max-w-xl mx-6">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="outline-none w-full px-2 py-1 text-gray-700"
            value={search}
            onChange={handleSearch} 
          />
          <FaSearch className="text-gray-500 ml-2 cursor-pointer hover:text-black transition-colors" />
        </div>

        {/* Icons Section */}
        <div className="hidden md:flex items-center gap-6 text-2xl">
          <Link to="/like" className=" text-red-500 hover:transition-colors ">
            <FaHeart />
          </Link> 
          <Link to="/cart" className="text-blue-500 ">
            <FaShoppingCart />
          </Link>

          {token && (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors focus:outline-none"
                aria-label="User menu"
              >
                <FaUserCircle />
                {userName && <span className="text-sm ml-1"></span>}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <p className="block px-4 py-2 text-sm text-gray-700 border-b">
                      Hi, {userName}
                    </p>
                    <Link
                      to="/userProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <p className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                    <Link to="/orders">My Orders</Link>  
                      </p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Search - Only shown when menu is open */}
        {menuOpen && (
          <div className="md:hidden w-full mt-3 flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full px-2 py-1"
              value={search}
              onChange={handleSearch} 
            />
            <FaSearch className="text-gray-500 ml-2 cursor-pointer" />
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;