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
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerified from "./pages/EmailVerified.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Produtos" element={<Products />} />
        <Route path="/Carrinho" element={<Cart />} />
        <Route path="/Pagamento" element={<Checkout />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="/Contato" element={<Contact />} />
        <Route path="/Perfil" element={<Profile />} />
        {/* Url easter egg */}
        <Route path="/Veneno" element={<Products />} />
        <Route path="/Conectar" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/RecSenha" element={<RecoverPassword />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/Sucesso" element={<SuccessPage />} />
        <Route path="/Cancelado" element={<CancelPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
