import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import apiLogin from "../../../services/login";

export default function Profile() {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  if (!apiLogin.isAuthenticated()) {
    navigate("/login");
    return;
  }

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    async function getInfo() {
      const id = await apiLogin.getId();
      const response = await apiLogin.getAccount(id);
      setNome(response.data.name);
      setUser(response.data);
      console.log(response.data);
    }

    getInfo();
  }, []);

  const formattedDate = user?.birth
    ? user.birth.split("T")[0].split("-").reverse().join("/")
    : "";

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />

      <div className="flex flex-col items-center h-full w-auto bg-[#FFDFB9]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-auto max-w-md">
          <h1 className="text-5xl font-bold mb-8 text-[#A4193D]">
            Perfil do Usuário
          </h1>

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#A4193D] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white text-xl md:text-2xl font-bold">
                {getUserInitials(nome)}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/profile/edit")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer mb-6"
            >
              Editar perfil
            </button>
          </div>

          <div className="space-y-4 text-lg">
            <p>
              <span className="font-semibold">Nome: </span>
              {nome}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {user ? user.email : "Carregando..."}
            </p>
            <p>
              <span className="font-semibold">Data de Nascimento: </span>
              {formattedDate}
            </p>
          </div>

          <div className="flex gap-5 mt-6 flex-nowrap">
             
            <button
              onClick={() => navigate("/profile/tasks")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer"
            >
              Suas Tarefas
            </button>

            <button
              onClick={() => navigate("/profile/comments")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer"
            >
              Seus Comentários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
