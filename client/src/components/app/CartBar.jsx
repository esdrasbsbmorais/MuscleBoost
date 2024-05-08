import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CloseIcon from "../../assets/icons/closeVM.svg";

export default function CartBar({ isOpen, toggleCart }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios
                .get("http://localhost:3001/cart", {
                    withCredentials: true,
                })
                .then(response => {
                    setItems(Array.isArray(response.data) ? response.data : []);
                })
                .catch(error => {
                    console.error("Erro ao buscar produtos do carrinho", error);
                });
        }
    }, [isOpen]);

    const handleQuantityChange = useCallback((productId, delta) => {
        axios
            .post(
                "http://localhost:3001/cart/add",
                { productId, quantity: delta },
                { withCredentials: true }
            )
            .then(response => {
                setItems(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error("Erro ao atualizar o carrinho", error);
            });
    }, []);

    return (
        <div className={`fixed right-0 top-0 w-80 h-full bg-[#171717] shadow-lg p-8 overflow-auto z-50 ${isOpen ? "block" : "hidden"}`}>
                    <button onClick={toggleCart} className="absolute top-4 right-4">
          <img src={CloseIcon} alt="Fechar" className="h-6 w-6" />
        </button>

            <h2 className="text-2xl text-gray-300 font-bold mb-4">Carrinho</h2>
            {items.length === 0 ? (
                <p>Seu carrinho está vazio</p>
            ) : (
                items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-gray-300 items-center mb-4">
                        <p>{item.product.name}</p>
                        <div className="flex items-center">
                            <button onClick={() => handleQuantityChange(item.product.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.product.id, 1)}>+</button>
                        </div>
                    </div>
                ))
            )}
            <Link to="/Carrinho" className="block mt-4 py-2 px-4 bg-[#830000] hover:bg-[#730000] text-white rounded text-center">
                Ir para o Carrinho
            </Link>
        </div>
    );
}
