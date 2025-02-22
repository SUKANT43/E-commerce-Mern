import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
         <Route path="user-login" element={<UserLogin/>}/>
         <Route path="user-signup" element={<UserSignup/>}/>
         <Route path="seller-login" element={<AdminLogin/>}/>
         <Route path="seller-signup" element={<AdminSignup/>}/>
         <Route path="cart" element={<Cart/>}/>
         <Route path="/" element={<Home/>}/>
         <Route path="like" element={<Like/>}/>
         <Route path="product-page" element={<ProductPage/>}/>
      </Routes>
     <Footer />
    </BrowserRouter>
  );
}

export default App;
