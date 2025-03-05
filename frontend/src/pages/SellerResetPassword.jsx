import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SellerResetPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const [confirmNewPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (confirmNewPassword !== data.newPassword) {
      setData({ ...data, newPassword: "" });
      setConfirmPassword('');
      return alert('Passwords do not match');
    }
    
    try {
      const response = await axios.put('http://localhost:2005/api/sellerLogin/c-password', data);
      if (response.data) {
        setData({
          email: "",
          password: "",
          newPassword: "",
        });
        setConfirmPassword('');
        alert('Password reset successful!');
        navigate("/seller-login"); 
      }
    } catch (e) {
      alert(`Error: ${e.message}`); 
    }
  }

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
            name="password" // Corrected from "oldPassword" to "password"
            value={data.password}
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
            value={confirmNewPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
