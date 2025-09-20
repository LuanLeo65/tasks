import Header from "../../../components/header";
import apiLogin from "../../../services/login";
import { useNavigate } from "react-router-dom";


export default function PrivateHome() {
  const navigate = useNavigate();

  if (!apiLogin.isAuthenticated()) {
    navigate('/login');
    return;
    }

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFDFB9]">
        <h1 className="text-5xl font-bold mb-8 text-[#A4193D]">
          Bem-vindo à sua área privada!
        </h1>
        <p className="text-2xl text-center text-[#A4193D]">
          Aqui você pode gerenciar suas tarefas de forma eficiente e organizada.
        </p>
      </div>
    </div>
  );
}
