import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/login";
import { Add } from "./Components/Add";
import { View } from "./Components/view";
import { EditProduct } from "./Components/EditProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addItems" element={<Add />} />
        <Route path="/viewProducts" element={<View />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
