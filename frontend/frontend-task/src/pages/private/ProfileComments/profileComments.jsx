import Header from "../../../components/header";
import apiLogin from "../../../services/login";
import apiComments from "../../../services/comment";
import apiTask from "../../../services/task";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileComments() {
  const [comments, setComment] = useState([]);

  const navigate = useNavigate();

  if (!apiLogin.isAuthenticated()) {
    navigate('/login');
    return;
    }

  useEffect(() => { 
  async function handleComments() { 
    try {
      const id = await apiLogin.getId();

      const responseComments = await apiComments.getAllUserComments(id);
      setComment(responseComments);

    } catch (error) {
      console.log("Erro durante a chamada de comentarios", error);
    }
  }

  handleComments();
  }, []);

  function handleNavigate(url) {
    return navigate(url);
  }

  function handleDelete(id) {
    async function deleteComment() {
      await apiComments.deleteComment(id);
      setComment((prev) => prev.filter((comments) => comments.id !== id));
    }
    deleteComment();
  }

  
    
  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
         <Header />
         <div className="bg-white p-8 rounded-3xl shadow-lg w-auto ">
           <h1 className="text-3xl font-bold mb-6 text-center text-[#A4193D]">
             Comentários do Usuário
           </h1>
             {comments && comments.length > 0 ? (
               <>
                 <div className="flex justify-end w-300">
                 </div>
                 <div className="overflow-x-auto w-full rounded-xl shadow-md">
                   <table className="min-w-full text-sm text-left text-gray-700 bg-white">
                     <thead className="text-xs uppercase bg-gray-200 text-gray-600">
                       <tr>
                         <th className="px-6 py-3 ">Tarefa</th>
                         <th className="px-6 py-3 ">Comentario</th>
                         <th className="px-6 py-3 text-center ">Ações</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-300">
                       {comments.map((comments, index) => (
                         <tr
                           key={index}
                           className="hover:bg-gray-100 transition-colors duration-200"
                         >
                           <td className="px-6 py-4 w-10 truncate">
                             {comments.taskId}
                           </td>
                           <td className="px-6 py-4 max-w-[300px] truncate">
                             {comments.comment}
                           </td>
                           <td className="px-6 py-4 text-center ">
                             <div className="flex items-center justify-center gap-4">
                               <button
                                 onClick={() =>
                                   handleNavigate(`/task/details/${comments.taskId}`)
                                 }
                                 className=" text-blue-600 hover:text-blue-800 transition cursor-pointer text-1xl"
                                 title="Ver detalhes"
                               >
                                 ☰
                               </button>
                               <button
                                 onClick={() => handleDelete(comments.id)}
                                 className="text-red-600 hover:text-red-800 transition cursor-pointer"
                                 title="Excluir"
                               >
                                 ❌
                               </button>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
                   <a href="/profile" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
               </>
             ) : (
               <>
                 <div className="w-full flex flex-col justify-center mb-5">
                   <p className="font-bold mb-6 text-center text-[#a4193ece]">                 
                       Voce não tem nenhum comentario
                   </p>
                   <a href="/profile" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
                 </div>
               </>
             )}
           </div>
         </div>
   
     );
}
