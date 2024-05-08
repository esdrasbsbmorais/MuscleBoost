import React, { useState } from "react";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import NavBar from "../components/app/NavBar";
import { Link } from "react-router-dom";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.log('Erro ao recuperar senha: ', error);
            alert('Erro ao recuperar senha.');
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
                        Recuperar Senha
                    </h2>
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md"
                    >
                        Enviar email
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-white">Já tem uma conta? </span>
                        <Link to="/Conectar" className="text-red-700 hover:text-red-500 hover:underline">
                            Conecte
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
