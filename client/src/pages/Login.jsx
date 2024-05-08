import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import NavBar from "../components/app/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const response = await fetch("http://localhost:3001/verify-token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ token })
                    });

                    const data = await response.json();

                    if (data.valid) {
                        navigate("/Conectar");
                    }
                } catch (error) {
                    console.error("Erro ao verificar o token:", error);
                }
            }
        };

        checkToken();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                alert('Login realizado com sucesso!');
                navigate('/Perfil');  // Redireciona para a rota protegida
            } else {
                if (data.message === "Por favor, verifique seu e-mail antes de fazer login.") {
                    alert(data.message);
                } else {
                    alert('Erro ao tentar logar: ' + data.message);
                }
            }
        } catch (error) {
            alert('Erro ao tentar logar: ' + error.message);
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
                        Bem-vindo de volta!
                    </h2>
                    <p className="text-center text-white mb-4">Não tem uma conta ainda? <Link to="/Registro" className="text-red-700 hover:text-red-500 hover:underline">Cadastre-se</Link></p>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 mt-2 text-slate-400 bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 cursor-text"
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
                                className="w-full px-4 py-3 mt-2 text-slate-400 bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 cursor-text"
                                placeholder="Digite sua senha"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-6 text-slate-400 hover:text-slate-200"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <Link to="/RecSenha" className="text-base text-red-700 hover:text-red-500 hover:underline float-right mt-2">Esqueceu a senha?</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md"
                    >
                        Conectar
                    </button>
                </form>
            </div>
        </div>
    );
}
