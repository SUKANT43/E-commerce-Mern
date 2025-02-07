import React, { useState } from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import { Login } from "./Login";
import { Route, Routes, useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to handle login (updates authentication state)
  const handleLogin = (status) => {
    setIsAuthenticated(status);
    if (status) navigate("/addproduct");
  };

  return (
    <div className="admin">
      {/* If not authenticated, show Login page */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar />
          <div className="top">
            <Routes>
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/listproduct" element={<ListProduct />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
