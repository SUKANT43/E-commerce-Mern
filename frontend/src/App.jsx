import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
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
function AppContent() {
  const location = useLocation();

  const adminRoutes = ["/admin-add-product", "/admin-view", "/admin-order", "/admin-shipping", "/admin"];

  return (
    <>
      {!adminRoutes.includes(location.pathname) && <NavBar />}
      {adminRoutes.includes(location.pathname) && <SellerNavBar />}

      <Routes>
        <Route path="user-login" element={<UserLogin />} />
        <Route path="user-signup" element={<UserSignup />} />
        <Route path="seller-login" element={<AdminLogin />} />
        <Route path="seller-signup" element={<AdminSignup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
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

      </Routes>

      {!adminRoutes.includes(location.pathname) && <Footer />}
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