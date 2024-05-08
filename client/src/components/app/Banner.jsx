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
    e.stopPropagation();
    setCurrent(index);
    resetInterval();
  };

  const { imageUrl, title, description, url } = images[current];

  return (
    <div>
      <Link to={url} className="block relative text-white no-underline">
        <img
          src={imageUrl}
          className="w-full object-cover h-[500px]"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </Link>
    </div>
  );
};
