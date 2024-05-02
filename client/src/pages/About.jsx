import React from "react";
import { aboutData } from "../api/objectAbout";
import NavBar from "../components/app/NavBar";

export default function About() {
  return (
    <div className="bg-[#111111] min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Quem Somos</h1>
          <p className="max-w-2xl mx-auto text-lg text-white">Especializados em suplementos nutricionais, oferecemos produtos que impulsionam seu bem-estar e performance esportiva, com vendas exclusivamente online desde 2024.</p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Nossa História</h2>
          <p className="text-center max-w-4xl mx-auto text-white">Fundada em 2024, nossa empresa surgiu com o propósito de oferecer suplementos de alta qualidade para o mercado online, sem a necessidade de lojas físicas, permitindo um alcance mais amplo e uma operação mais ágil.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center py-8 bg-gradient-to-br from-[#301414] to-[#552424]">
          {Object.values(aboutData).map((section, index) => (
            <div key={index} className="flex flex-col items-center px-4 py-2">
              <img src={section.icon} alt={section.title} className="mb-4 w-16 h-16"/>
              <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              {Array.isArray(section.description) ? (
                <ul className="list-disc list-inside pl-4 text-white">
                  {section.description.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-white">{section.description}</p>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
