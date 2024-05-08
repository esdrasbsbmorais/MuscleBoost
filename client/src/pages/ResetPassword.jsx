import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import NavBar from "../components/app/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.replaceAll("'", ""));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value.replaceAll("'", ""));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                navigate("/conectar");
            }
        } catch (error) {
            console.log('Erro ao redefinir a senha: ', error);
            alert('Erro ao redefinir a senha.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-10 bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl"
                >
                    <img className="h-28 mx-auto" src={LogoMuscleVM} alt="Logo MuscleVM" />
                    <h2 className="text-2xl font-bold text-center text-white mt-4 mb-4">
                        Redefinir Senha
                    </h2>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg text-white">
                            Nova Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                                placeholder="Digite sua nova senha"
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
                            Confirmar Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                                placeholder="Confirme sua nova senha"
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
                        Redefinir
                    </button>
                </form>
            </div>
        </div>
    );
}
