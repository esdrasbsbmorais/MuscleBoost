import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos", error);
      });

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLikedProducts(
            response.data.likedProducts.map((product) => product.id)
          );
        })
        .catch((error) => {
          console.error("Erro ao buscar perfil do usuário", error);
        });
    }
  }, []);

  const toggleLike = useCallback(
    (productId) => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .post(
            `http://localhost:3001/products/${productId}/like`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            if (likedProducts.includes(productId)) {
              setLikedProducts(likedProducts.filter((id) => id !== productId));
            } else {
              setLikedProducts([...likedProducts, productId]);
            }
          })
          .catch((error) => {
            console.error("Erro ao curtir/descurtir produto", error);
          });
      } else {
        console.error("Usuário não autenticado!");
        navigate("/Conectar");
      }
    },
    [likedProducts, navigate]
  );

  const addToCart = useCallback(
    (productId) => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .post(
            "http://localhost:3001/cart/add",
            {
              productId,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            setCart(Array.isArray(response.data) ? response.data : []);
            console.log("Produto adicionado ao carrinho com sucesso!");
          })
          .catch((error) => {
            console.error("Erro ao adicionar produto ao carrinho", error);
          });
      } else {
        console.error("Usuário não autenticado!");
        navigate("/Conectar");
      }
    },
    [navigate]
  );

  return (
    <div>
      <div className="flex justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-4">Produtos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#191919] text-white rounded-lg shadow-md"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400">
                    Preço: R$ {product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`mt-2 mb-2 px-4 py-2 rounded-md ${
                      likedProducts.includes(product.id)
                        ? "bg-[#830000]"
                        : "bg-gray-600"
                    }`}
                  >
                    {likedProducts.includes(product.id)
                      ? "Descurtir"
                      : "Curtir"}
                  </button>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full py-2 rounded-md bg-[#830000]"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
