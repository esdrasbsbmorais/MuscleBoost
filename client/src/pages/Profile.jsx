import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/app/NavBar";
import LogoMuscleVM from "../assets/logos/LogoMuscleVM.svg";
import { FaEye, FaEyeSlash, FaTrash, FaCartPlus } from "react-icons/fa";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    likedProducts: [],
    profilePicture: "",
    emailVerified: false,
  });
  const [showSection, setShowSection] = useState("profile"); // "profile", "password", "likedProducts"
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setMessage("Erro ao carregar dados do usuário");
      }
    };
    fetchUser();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("As senhas novas não coincidem!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/profile/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowSection("profile");
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      setMessage("Erro ao atualizar: " + error.response?.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Você foi desconectado");
    navigate("/Conectar");
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/profile/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Conta excluída com sucesso!");
      localStorage.removeItem("token");
      navigate("/Conectar");
    } catch (error) {
      console.error("Erro ao excluir a conta:", error);
      alert("Erro ao excluir a conta: " + error.response?.data.message);
    }
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("picture", file);
      try {
        const response = await axios.post(
          "http://localhost:3001/profile/upload-picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser((prev) => ({ ...prev, profilePicture: response.data.picturePath }));
        setMessage("Foto de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao fazer upload da foto do perfil:", error);
        setMessage("Erro ao fazer upload da foto do perfil: " + error.response?.data.message);
      }
    }
  };

  const handleRemoveLikedProduct = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/${productId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser((prev) => ({
        ...prev,
        likedProducts: prev.likedProducts.filter((p) => p.id !== productId),
      }));
      setMessage("Produto removido dos curtidos com sucesso!");
    } catch (error) {
      console.error("Erro ao remover produto dos curtidos", error);
      setMessage("Erro ao remover produto dos curtidos: " + error.response?.data.message);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Produto adicionado ao carrinho com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho", error);
      setMessage("Erro ao adicionar ao carrinho: " + error.response?.data.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[#111111] main-content">
        <div className="w-full max-w-5xl bg-[#191919] bg-opacity-90 rounded-xl shadow-2xl flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 p-10 flex flex-col items-center">
            <img
              src={
                user.profilePicture
                  ? `http://localhost:3001${user.profilePicture}`
                  : LogoMuscleVM
              }
              alt="User"
              className="rounded-full w-32 h-32 mb-4"
            />
            <input
              type="file"
              onChange={handlePictureUpload}
              className="hidden"
              id="profile-picture-upload"
            />
            <label
              htmlFor="profile-picture-upload"
              className="text-white cursor-pointer bg-[#830000] hover:bg-[#730000] px-4 py-2 rounded-md"
            >
              Carregar Foto
            </label>
            <h3 className="text-xl font-bold text-white mt-4">{user.name}</h3>
            <p className="text-white">{user.email}</p>
          </div>

          <div className="w-full sm:w-2/3 p-10">
            <div className="flex flex-col sm:flex-row mb-4">
              <button
                onClick={() => setShowSection("profile")}
                className={`w-full sm:w-1/3 mb-4 sm:mb-0 py-2 px-4 mx-2 rounded-md ${
                  showSection === "profile" ? "bg-blue-600" : "bg-gray-600"
                } text-white`}
              >
                Perfil
              </button>
              <button
                onClick={() => setShowSection("likedProducts")}
                className={`w-full sm:w-1/3 mb-4 sm:mb-0 py-2 px-4 mx-2 rounded-md ${
                  showSection === "likedProducts" ? "bg-blue-600" : "bg-gray-600"
                } text-white`}
              >
                Produtos Curtidos
              </button>
              <button
                onClick={() => setShowSection("password")}
                className={`w-full sm:w-1/3 py-2 px-4 mx-2 rounded-md ${
                  showSection === "password" ? "bg-blue-600" : "bg-gray-600"
                } text-white`}
              >
                Redefinir Senha
              </button>
            </div>

            {message && (
              <p className="text-center text-white mb-4">{message}</p>
            )}

            {showSection === "profile" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                  <div className="flex flex-wrap justify-between">
                    <p className="text-gray-400">Nome:</p>
                    <p className="ml-2 text-white w-full md:w-auto">
                      {user.name}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="text-gray-400">Email:</p>
                    <p className="ml-2 text-white w-full md:w-auto">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="text-gray-400">Verificação de Email:</p>
                    <p
                      className={`ml-2 w-full md:w-auto ${
                        user.emailVerified ? "text-orange-500" : "text-red-500"
                      }`}
                    >
                      {user.emailVerified ? "Verificado" : "Pendente"}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="text-gray-400">Status:</p>
                    <p className="ml-2 w-full md:w-auto text-green-500">
                      Ativo
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 mt-4 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md"
                >
                  Desconectar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-3 mt-4 text-lg font-semibold bg-red-600 hover:bg-red-500 text-white rounded-md"
                >
                  Excluir Conta
                </button>
              </>
            )}

            {showSection === "likedProducts" && (
              <>
                <h2 className="text-xl font-bold text-white mb-4">Produtos Curtidos</h2>
                {user.likedProducts.length > 0 ? (
                  <div className="space-y-4">
                    {user.likedProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center">
                        <span className="text-white">{product.name}</span>
                        <div>
                          <button
                            onClick={() => handleRemoveLikedProduct(product.id)}
                            className="text-red-500 hover:text-red-700 mr-2"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <FaCartPlus />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white">Você não curtiu nenhum produto ainda.</p>
                )}
              </>
            )}

            {showSection === "password" && (
              <form onSubmit={handleUpdatePassword}>
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-lg text-white">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                      placeholder="Digite sua senha atual"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-6 text-white hover:text-slate-200"
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-lg text-white">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                      placeholder="Digite sua nova senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-6 text-white hover:text-slate-200"
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-lg text-white">
                    Confirme Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 mt-2 text-white bg-[#121212] rounded-md focus:bg-[#121212] focus:border-red-800 focus:outline-none focus:ring-4 focus:ring-red-800 cursor-text"
                      placeholder="Confirme sua nova senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-6 text-white hover:text-slate-200"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold bg-[#830000] hover:bg-[#730000] text-white rounded-md mb-4"
                >
                  Atualizar Senha
                </button>

                <button
                  onClick={() => setShowSection("profile")}
                  className="w-full py-3 text-lg font-semibold bg-gray-600 hover:bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
