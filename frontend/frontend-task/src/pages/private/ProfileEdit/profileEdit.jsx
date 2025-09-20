import Header from "../../../components/header";
import apiLogin from "../../../services/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirthdate] = useState("");

  const navigate = useNavigate();
 
  if (!apiLogin.isAuthenticated()) {
    navigate('/login');
    return;
    }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const id = await apiLogin.getId();
      const updatedUser = {
        name,
        email,
        birth,
      };  
      await apiLogin.setAccount(id, updatedUser);
      alert("Perfil atualizado com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.log("Erro ao atualizar o perfil", error);
      alert("Erro ao atualizar o perfil. Tente novamente.");
    } 
  }



  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />

      <div className="bg-white p-8 rounded-3xl shadow-lg w-[90%] max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-[#A4193D]">
          Editar Perfil
        </h1>
        <form className="space-y-6" onSubmit={handleUpdate}>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Nome:
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Email:
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Data de Nascimento:
            </label>
            <input
              type="date"
              className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
