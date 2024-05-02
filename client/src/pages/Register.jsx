import React, { useState } from "react";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import NavBar from "../components/app/NavBar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register with:", name, email, password, confirmPassword);
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
              <label htmlFor="email" className="block text-lg text-white">
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg text-white">
                Confirme Sua Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                placeholder="Confirme sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md"
            >
              Registre-se
            </button>
          </form>
        </div>
    </div>
  );
}
