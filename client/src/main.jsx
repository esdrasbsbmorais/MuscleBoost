import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RecoverPassword from "./pages/RecoverPassword.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Produtos" element={<Products />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="/Contato" element={<Contact />} />
        {/* Url easter egg */}
        <Route path="/Veneno" element={<Products />} />
        <Route path="/Conectar" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/RecSenha" element={<RecoverPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
