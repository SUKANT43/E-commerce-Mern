import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/adminSignup";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
         <Route path="user-login" element={<UserLogin/>}/>
         <Route path="user-signup" element={<UserSignup/>}/>
         <Route path="seller-login" element={<AdminLogin/>}/>
         <Route path="seller-signup" element={<AdminSignup/>}/>
      </Routes>
     <Footer />
    </BrowserRouter>
  );
}

export default App;
