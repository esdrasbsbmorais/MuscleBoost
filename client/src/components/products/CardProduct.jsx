import React from "react";
import { products } from "../../api/objectProducts";

const ProductCard = () => {
  return (
    <div>
      <div className="flex justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-4">Produtos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-[#191919] text-white rounded-lg shadow-md">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400">
                    Preço: R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
