import React from "react";
import NavBar from "../components/app/NavBar";
import Banner from "../components/app/Banner";
import { imageData } from "../api/objectImages";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Banner images={imageData} />
    </div>
  );
}
