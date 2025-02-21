import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h2 className="text-lg font-bold mb-3">Exclusive</h2>
          <p className="mb-3">Subscribe</p>
          <p className="mb-4 text-gray-400">Get 10% off your first order</p>
          <div className="flex items-center border border-gray-500 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Enter your email"
              className="px-4 py-2 bg-transparent outline-none w-full text-white"
            />
            <button className="bg-white text-black px-4 py-2 rounded-2xl cursor-pointer">
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Support</h2>
          <p className="text-gray-400">
            Sathymangalam, BIT, Tamil Nadu.
          </p>
          <p className="mt-2 text-gray-400">sukant98657@gmail.com</p>
          <p className="mt-2 text-gray-400">+91 8248761765</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Account</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="cursor-pointer hover:text-white">My Account</li>
            <li className="cursor-pointer hover:text-white">Login / Register</li>
            <li className="cursor-pointer hover:text-white">Cart</li>
            <li className="cursor-pointer hover:text-white">Wishlist</li>
            <li className="cursor-pointer hover:text-white">Shop</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Quick Link</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
            <li className="cursor-pointer hover:text-white">Terms Of Use</li>
            <li className="cursor-pointer hover:text-white">FAQ</li>
            <li className="cursor-pointer hover:text-white">Contact</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-4 text-gray-400 text-xs">
        © Copyright Sukant 2025. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
