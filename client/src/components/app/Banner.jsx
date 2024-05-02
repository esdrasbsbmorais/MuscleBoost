import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Banner ({ images }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrent((current) => (current + 1) % images.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const handleDotClick = (index, e) => {
    e.stopPropagation(); // Impede que o evento clique se propague
    setCurrent(index);
    resetInterval();
  };

  const { imageUrl, title, description, url } = images[current];

  return (
    <div>
      <Link to={url} className="block relative text-white no-underline">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover h-[500px]"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg sm:text-xl text-center max-w-md px-4">{description}</p>
        </div>
      </Link>
      <div className="flex justify-center pb-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`h-3 w-16 m-2 ${current === index ? "bg-gray-700" : "bg-gray-500"} cursor-pointer hover:bg-gray-700`}
            style={{
              transition: 'background-color 0.3s ease'
            }}
            onClick={(e) => handleDotClick(index, e)}
          >
            {current === index && (
              <div className="h-full bg-white"
                   style={{
                     animation: `fill 5s linear forwards`
                   }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
