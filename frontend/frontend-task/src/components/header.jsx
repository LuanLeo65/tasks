//components/header.jsx
import { useNavigate } from "react-router-dom";
import icone from "../assets/lista-de-tarefas.png";
import apiLogin from "../services/login";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const token = apiLogin.getToken();

  const navigate = useNavigate()

  async function handleLogout() {
     await logout();
    //const userId = apiLogin.getId();
    //await apiLogin.logout(userId);
    //apiLogin.setToken("");
    //apiLogin.setId("");
    //apiLogin.setAuthor("");

    navigate("/login", {replace: true});
  }

  return (
    <>
      {user ? ( 
      <div className="flex items-center justify-between mb-20 border-b-1 border-gray-400 w-screen bg-[#A4193D]">
      <img src={icone} alt="Tasks" className="w-20 h-20 flex-none bg-[#A4193D]" />
      <div className="flex fle-row gap-8 text-center">
        <p onClick={() => navigate("/home")} className="text-3xl font-medium flex-auto text-center text-[#FFDFB9] hover:underline underline-offset-1 transition duration-300 cursor-pointer">Inicio</p>
        <p onClick={() => navigate("/Task")} className="text-3xl font-medium flex-auto text-center text-[#FFDFB9] hover:underline underline-offset-1 transition duration-300 cursor-pointer">Tarefas</p>
        <p onClick={() => navigate("/profile")} className="text-3xl font-medium flex-auto text-center text-[#FFDFB9] hover:underline underline-offset-1 transition duration-300 cursor-pointer">Perfil</p>
      </div>
      <a onClick={() => handleLogout()} className="text-3xl font-medium text-center text-[#FFDFB9] hover:underline underline-offset-1 transition duration-300 mr-8 cursor-pointer">Sair</a>
    </div>
      ): (
        <div className="flex items-center justify-between mb-20 border-b-1 border-gray-400 w-screen bg-[#A4193D]">
           <img src={icone} alt="Tasks" className="w-20 h-20 flex-none bg-[#A4193D]" />
            <p className="text-3xl font-medium flex-auto text-center text-[#FFDFB9]">Bem vindo ao site de Tarefas</p>
            <div className="w-20 h-20 flex-none bg-[#A4193D]"></div>
        </div>
      )}
    </>
    
  );
}
