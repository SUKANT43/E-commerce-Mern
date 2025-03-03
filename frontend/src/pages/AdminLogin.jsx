import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const log = await axios.post("http://localhost:2005/api/sellerLogin/login", data);

      if (log.status === 200 && log.data.token) {
        localStorage.setItem("token", log.data.token);
        alert("Login Successful");
        navigate("/");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Incorrect email or password. Please try again.");
      } else {
        alert("Login failed. Please check your credentials.");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <p className="text-gray-500 text-center mb-4">Enter your details below</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
            required
          />

          <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md font-semibold cursor-pointer">
            Login
          </button>
        </form>

        <p className="text-gray-500 text-center mt-4">
          Create an account? <Link to="/seller-signup" className="text-gray-800 font-semibold">Create</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
