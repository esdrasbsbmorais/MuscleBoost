import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/app/NavBar";

export default function EmailVerified() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/Perfil");
        } else {
            alert("Token de verificação não fornecido ou inválido.");
            navigate("/Conectar");
        }
    }, [location, navigate]);

    return (
        <div>
            <NavBar />
            <div
                className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content"
            >
                <div className="w-full max-w-md p-10 bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-center text-white mt-4 mb-4">
                        E-mail verificado com sucesso!
                    </h2>
                    <p className="text-center text-white mb-4">Agora você pode acessar o sistema.</p>
                </div>
            </div>
        </div>
    );
}
