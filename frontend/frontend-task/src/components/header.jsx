//components/header.jsx
import { useLocation, useParams } from "react-router-dom";
import icone from "../assets/lista-de-tarefas.png";

export default function Header() {
  const location = useLocation();
  
  let title = ""

  if(location.pathname === "/"){
    title = "Tarefas"
  }else if(location.pathname === "/addtask") {
    title = "Adicionar Tarefa"
  } else if(location.pathname.startsWith("/task/addcomment/")) {
    title = "Adicionar Comentário"
  } else if(location.pathname.startsWith("/task/details/")) {
    title = "Detalhes da Tarefa"
  } else if(location.pathname.startsWith("/task/set/")) {
    title = "Editar Tarefa"
  } else if(location.pathname.startsWith("/comment/set")) {
    title = "Editar Comentario"
  }

  

  return (
    <div className="flex mb-20 border-b-1 border-gray-400 w-screen items-center bg-[#A4193D]">
      <img src={icone} alt="Tasks" className="w-20 h-20 flex-none bg-[#A4193D]" />
      <h1 className="text-3xl font-medium flex-auto text-center text-[#FFDFB9]">{title}</h1>
      <div className="w-20 h-20 flex-none" />
    </div>
  );
}
