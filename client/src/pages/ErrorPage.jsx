import React from 'react';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#191919] text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Desculpe, a página que você está procurando não foi encontrada.</p>
      <a href="/" className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Voltar para a Página Inicial
      </a>
    </div>
  );
}
