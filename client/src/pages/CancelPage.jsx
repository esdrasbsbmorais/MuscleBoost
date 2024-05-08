import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/app/NavBar";

export default function CancelPage() {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate("/pagamento");
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Pagamento cancelado.</h1>
        <button
          onClick={handleReturnToCart}
          className="mt-5 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
        >
          Voltar ao carrinho
        </button>
      </div>
    </div>
  );
}
