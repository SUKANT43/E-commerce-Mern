import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/adminSignup";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Like from "./pages/Like";
import ProductPage from "./pages/ProductPage";
import Demo from "./pages/demo";
import SellerResetPassword from "./pages/sellerResetPassword";
import UserResetPassword from "./pages/userResetPassword";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminView from "./pages/AdminView";
import AdminOrder from "./pages/AdminOrder";
import AdminShipping from "./pages/AdminShipping";
import SellerNavBar from "./components/SellerNavBar";
import ErrorBoundary from "./pages/ErrorBoundary";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";
import { useState } from "react"; 
import About from "./pages/About";

function AppContent() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const adminRoutes = [
    "/admin-add-product",
    "/admin-view",
    "/admin-order",
    "/admin-shipping",
    "/admin",
    "/seller-login",
    "/seller-signup",
    "/seller-reset-password",
    "/edit/:id",
  ];
  const sellerRoutes = [
    "/seller-login",
    "/seller-signup",
    "/seller-reset-password",
    "/edit/:id",
  ];

  const isAdminPage = adminRoutes.includes(location.pathname);
  const isSellerPage = sellerRoutes.includes(location.pathname);
  const isEditProductPage = location.pathname.startsWith("/edit/");

  return (
    <>
      {!isAdminPage && !isEditProductPage && <NavBar setSearchQuery={setSearchQuery} />}
      {(isAdminPage || isEditProductPage) && !isSellerPage && <SellerNavBar />}

      <Routes>
        <Route path="user-login" element={<UserLogin />} />
        <Route path="user-signup" element={<UserSignup />} />
        <Route path="seller-login" element={<AdminLogin />} />
        <Route path="seller-signup" element={<AdminSignup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="like" element={<Like />} />
        <Route path="product-page" element={<ProductPage />} />
        <Route path="demo" element={<Demo />} />
        <Route path="seller-reset-password" element={<SellerResetPassword />} />
        <Route path="user-reset-password" element={<UserResetPassword />} />
        <Route path="admin-add-product" element={<AdminAddProduct />} />
        <Route path="admin-view" element={<AdminView />} />
        <Route path="admin-order" element={<AdminOrder />} />
        <Route path="admin-shipping" element={<AdminShipping />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Routes>

      {!isAdminPage && !isEditProductPage && <Footer />}
    </>
  );
}



function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;