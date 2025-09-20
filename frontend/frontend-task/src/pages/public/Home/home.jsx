import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
 const navigate = useNavigate()

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />
      <div className="w-[90%] max-w-md mx-auto bg-white p-5 rounded-3xl shadow-lg mt-8 space-y-4 mb-6">
      <h1 className="block mb-5 font-semibold text-gray-800 text-4xl mt-3 text-center">Bem vindo ao site de Tarefas</h1>
      <p className="mb-10">Para continuar clique em login, caso nao tenha nenhuma conta, clique em cadastrar</p>
      <button onClick={() => navigate("/login")} className="w-[90%] max-w-md py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition mb-4">Login</button>
      <button onClick={() => navigate("/signup")} className="w-[90%] max-w-md py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition">Cadastrar</button>
      </div>
    </div>
  );
}