import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/app/NavBar";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/cart", {
                withCredentials: true,
            })
            .then((response) => {
                setCart(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos do carrinho", error);
            });
    }, []);

    const handleQuantityChange = (productId, delta) => {
        if (!productId || delta == null) {
            console.error("ProductId ou Quantity não fornecido!");
            return;
        }
    
        axios.post(
            "http://localhost:3001/cart/add",
            { productId, quantity: delta },
            { withCredentials: true }
        ).then(response => {
            setCart(Array.isArray(response.data) ? response.data : []);
        }).catch(error => {
            console.error("Erro ao atualizar o carrinho", error);
            console.error(error.response?.data);
        });
    };
    
    
    const handleRemove = (productId) => {
        axios.post(
            "http://localhost:3001/cart/remove",
            { productId },
            { withCredentials: true }
        ).then(response => {
            setCart(Array.isArray(response.data) ? response.data : []);
        }).catch(error => {
            console.error("Erro ao remover item do carrinho", error);
            console.error(error.response?.data);
        });
    };    

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content">
                <div className="w-full max-w-5xl bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl flex flex-col p-10">
                    <h2 className="text-2xl font-bold text-white mb-6">Seu Carrinho</h2>
                    {cart.length === 0 ? (
                        <p className="text-center text-white">Seu carrinho está vazio</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={item.product?.id || index} className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={`http://localhost:3001${item.product?.photoPath || '/path_to_default_image.jpg'}`}
                                        alt={item.product?.name || "Produto"}
                                        className="w-20 h-20 rounded-md"
                                    />
                                    <div className="ml-4 text-white">
                                        <p>{item.product?.name || "Produto"}</p>
                                        <p>R${(item.product?.price || 0).toFixed(2)}</p>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.product?.id, -1)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-2 py-1"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.product?.id, 1)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-2 py-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.product?.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white rounded-md px-4 py-2"
                                >
                                    Remover
                                </button>
                            </div>
                        ))
                    )}
                    {cart.length > 0 && (
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 mt-4 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md"
                        >
                            Finalizar Compra
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
