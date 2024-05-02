import React, { useState } from 'react';

export default function CartBar({ isOpen, toggleCart }) {
  const [items, setItems] = useState([]);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[300px] bg-[#0c0c0c] text-white p-4 z-50 transition-transform ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
      <button onClick={toggleCart} className="text-white">
        Fechar
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} <button onClick={() => removeItem(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <div>Total: {items.reduce((total, item) => total + item.quantity * item.price, 0)}</div>
    </div>
  );
}
