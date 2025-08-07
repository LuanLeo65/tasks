import Header from "../../components/header";
import { useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import apiComment from "../../services/comment.js";

export default function SetComment() {
  const [author, setAuthor] = useState();
  const [comment, setComment] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const navigate = useNavigate();
  const {idTask: taskId, idComment: commentId} = useParams();

  async function handleAddComment(e) {
    e.preventDefault()

    const payload = {
      author: author,
      comment: comment,
    };

    if (!author || !comment) {
      alert("Por favor, preencha os campos corretamente");
    }

    try {
      await apiComment.setComment(commentId, payload);
      setSuccessMessage("Comentario editado com sucesso!");

      setTimeout(() => {
        navigate(`/task/details/${taskId}`);
      }, 2000);
    } catch (error) {
      console.log("Ocorreu um erro ao editar comentario:", error);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />
      {successMessage ? (
        <p className="text-lg text-white mt-4 bg-green-500  rounded-2xl p-5 shadow-2xl">{successMessage}</p>
      ) : (
        <form onSubmit={handleAddComment} className="w-[90%] max-w-md mx-auto bg-white p-6 rounded-3xl shadow-lg mt-8 space-y-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Seu Nome:</label>
            <input
              type="text"
              placeholder="Digite seu nome aqui"
              className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-800">Comentário:</label>
            <textarea
              value={comment}
              placeholder="Digite o que deseja editar"
              className="w-full border border-gray-400 rounded-xl px-3 py-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition"> Editar Comentário</button>
          <a href={`/task/details/${taskId}`} className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>

        </form>

      )}
    </div>
  );
}
