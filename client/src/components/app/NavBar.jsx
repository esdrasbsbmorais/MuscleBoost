import React, { useState, useEffect } from "react";
import LogoBC from "../../assets/logos/LogoBC.svg";
import barBG from "../../assets/icons/barBC.svg";
import cartBC from "../../assets/icons/cartBC.svg";
import SideBar from "./SideBar";
import CartBar from "./CartBar";
import defaultUser from "../../assets/icons/defaultUser.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(window.innerWidth >= 450);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3001/verify-token", { token })
        .then((response) => {
          if (response.data.valid) {
            setIsLoggedIn(true);
            return axios.get("http://localhost:3001/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            setIsLoggedIn(false);
          }
        })
        .then((profileResponse) => {
          const profileData = profileResponse.data;
          profileData.profilePicture = profileData.profilePicture
            ? `http://localhost:3001${profileData.profilePicture}`
            : null;
          setUser(profileData);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          console.error(error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowLogo(window.innerWidth >= 450);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { label: "Inicio", path: "/" },
    { label: "Produtos", path: "/produtos" },
    { label: "Quem somos", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ];

  return (
    <nav className="bg-[#171717] shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center">
            <button className="md:hidden h-9 mr-4" onClick={toggleSidebar}>
              <img src={barBG} alt="Menu" className="h-8" />
            </button>
          </div>
          {showLogo && <img className="h-12" src={LogoBC} alt="Logo" />}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-gray-300 hover:text-[#830000] px-3 py-2 rounded-md text-lg font-medium ${
                  location.pathname === link.path ? "text-[#830000]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <Link to={"/Perfil"}>
                <img
                  src={user?.profilePicture || defaultUser}
                  className="h-9 w-9 rounded-full cursor-pointer"
                  alt="Usuário"
                />
              </Link>
            ) : (
              <div className="flex items-center text-gray-300 px-3 py-2 rounded-md text-lg font-medium">
                <img src={defaultUser} className="h-9 mr-4" alt="Perfil" />
                <span className="leading-tight">
                  <Link to={"/Conectar"} className="mr-2 hover:text-[#830000]">Conecte</Link>
                  ou
                  <br />
                  <Link to={"/Registro"} className="hover:text-[#830000]">Cadastre-se</Link>
                </span>
              </div>
            )}
            <div className="relative ml-4">
              <img
                src={cartBC}
                className="h-9 text-gray-300 cursor-pointer"
                alt="Carrinho"
                onClick={toggleCart}
              />
              <div className="absolute top-[-5px] right-[-5px] h-4 w-4 bg-[#830000] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart}
          ></div>
          <CartBar isOpen={isCartOpen} toggleCart={toggleCart} />
        </>
      )}
      <SideBar isOpen={isSidebarOpen} toggle={toggleSidebar} />
    </nav>
  );
}
