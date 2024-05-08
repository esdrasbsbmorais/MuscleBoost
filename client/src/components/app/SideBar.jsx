import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/icons/closeVM.svg";

export default function SideBar({ isOpen, toggle }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggle}></div>
      )}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-[#171717] text-gray-300 p-4 z-50 transition-transform ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
        <button onClick={toggle} className="absolute top-4 right-4">
          <img src={CloseIcon} alt="Fechar" className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-medium mb-4">Menu</h2>
        <ul className="space-y-2">
          <li><Link to="/" onClick={toggle} className="block hover:text-[#830000]">Inicio</Link></li>
          <li><Link to="/sobre" onClick={toggle} className="block hover:text-[#830000]">Sobre</Link></li>
          <li><Link to="/produtos" onClick={toggle} className="block hover:text-[#830000]">Produtos</Link></li>
          <li><Link to="/contato" onClick={toggle} className="block hover:text-[#830000]">Contato</Link></li>
        </ul>
      </div>
    </>
  );
}
