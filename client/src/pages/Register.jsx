import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import NavBar from "../components/app/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
        setErrorMessage("As senhas não coincidem!");
        return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              name,
              email,
              password,
          }),
      });
  
      const data = await response.json();
      if (response.status === 201) {
          setSuccessMessage("Registro realizado com sucesso! Por favor, verifique seu e-mail para confirmar sua conta.");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            navigate("/Conectar");
          }, 5000);
      } else {
          throw new Error(data.message || "Erro ao registrar o usuário");
      }
    } catch (error) {
        setErrorMessage("Erro ao registrar: " + error.message);
    }
  };

  return (
    <div>
        <NavBar />
        <div
          className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-10 bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl"
          >
            <img className="h-28 mx-auto" src={LogoMuscleVM} alt="Logo MuscleVM" />
            <h2 className="text-2xl font-bold text-center text-white mt-4 mb-4">
              Registre-se
            </h2>

            {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-center text-green-500 mb-4">{successMessage}</p>}

            <div className="mb-4">
              <label htmlFor="name" className="block text-lg text-white">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                placeholder="Digite seu nome completo"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" class="block text-lg text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg text-white">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-6 text-white hover:text-slate-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg text-white">
                Confirme a Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                  placeholder="Confirme sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-6 text-white hover:text-slate-200"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-red-800 rounded-md hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-800"
            >
              Registrar
            </button>
            <div className="flex justify-center mt-4">
              <p className="text-white">Já tem uma conta? </p>
              <Link to="/Conectar" className="text-red-800 hover:underline ml-2">
                Conectar
              </Link>
            </div>
          </form>
        </div>
    </div>
  );
}
