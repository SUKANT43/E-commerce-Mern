import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function userSignup() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (data.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2005/api/userLogin/register', data);
      if (response.data) {
        setData({ name: '', email: '', password: '' });
        setConfirmPassword('');
        setSuccess('User created successfully!');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.msg || 'Something went wrong';
      if (errorMessage.toLowerCase().includes('user already exists')) {
        setError('This email is already registered. Please log in.');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center">Create an account</h2>
        <p className="text-gray-500 text-center mb-4">Enter your details below</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={data.name}
            name="name"
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email or Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={data.email}
            name="email"
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={data.password}
            name="password"
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md font-semibold">
            Create Account
          </button>
        </form>

        <p className="text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <Link to="/seller-login" className="text-gray-800 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default userSignup;
