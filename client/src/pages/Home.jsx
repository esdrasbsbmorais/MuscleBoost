import React, { useState } from "react";
import NavBar from "../components/app/NavBar";
import Banner from "../components/app/Banner";
import { imageData } from "../api/objectImages";

export default function Home() {
  const [textInput, setTextInput] = useState("");

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textInput.toLowerCase() === "anabolizantes" || textInput.toLowerCase() === "veneno") {
      alert("Heeee, então você gosta das paradinhas né? Sei do que você precisa");
      window.open("https://landerlanoficialbrasil.com.br/produto/acetato-de-trembolona-75-mg-10-ml/", "_blank");
    } else {
      alert("Para crescer, é importante focar em uma dieta balanceada, treino adequado, descanso suficiente e suplementos de qualidade.");
    }
  };

  return (
    <div>
      <NavBar />
      <Banner images={imageData} />
      <div className="bg-[#111111] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">Qual o segredo para crescer de verdade?</h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="text"
              value={textInput}
              onChange={handleInputChange}
              placeholder="Digite algo..."
              className="w-full px-4 py-3 mt-2 text-slate-400 bg-gradient-to-br from-[#301414] to-[#552424] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 cursor-text"
            />
            <button type="submit" className="w-full text-white mt-5 py-2 px-4 rounded-md bg-[#830000] hover:bg-[#730000] transition duration-300">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
