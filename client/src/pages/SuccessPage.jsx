import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/app/NavBar";
import axios from "axios";

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('http://localhost:3001/cart/clear', {}, { withCredentials: true })
      .then(() => console.log("Carrinho limpo"))
      .catch(error => console.error("Erro ao limpar o carrinho", error));
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Pagamento realizado com sucesso!</h1>
        <button
          onClick={handleGoHome}
          className="mt-5 px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition"
        >
          Voltar à página inicial
        </button>
      </div>
    </div>
  );
}
