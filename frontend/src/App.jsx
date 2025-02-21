import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    </>
  )
}

export default App
