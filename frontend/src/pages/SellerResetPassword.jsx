import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SellerResetPassword() {
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <p className="text-gray-500 text-center mb-4">Enter your details below</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Old Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="oldPassword"
            value={data.oldPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="confirmNewPassword"
            value={data.confirmNewPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md font-semibold cursor-pointer">
            Reset Password
          </button>
        </form>

        <p className="text-gray-500 text-center mt-4">
          Login? <span className="text-gray-800 font-semibold cursor-pointer" onClick={() => navigate("/seller-login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default SellerResetPassword;
