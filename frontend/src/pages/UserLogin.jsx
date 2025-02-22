import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
function userLogin() {
  return (
    <div>
       <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <p className="text-gray-500 text-center mb-4">Enter your details below</p>
        
        <form className="space-y-4">
          <input type="email" placeholder="Email or Phone Number" className="w-full p-3 border border-gray-300 rounded-md" />
          <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md" />
          
          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md font-semibold">Login</button>
        </form>
        
        
        <p className="text-gray-500 text-center mt-4">
          Create an account?  <Link to="/user-signup" className="text-gray-800 font-semibold">Create</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default userLogin
