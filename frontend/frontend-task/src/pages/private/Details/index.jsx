import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import apiTask from "../../../services/task";
import apiComment from "../../../services/comment";
import { useEffect, useState } from "react";
import auth from "../../../services/login";

export default function Details() {
  const [author, setAuthor] = useState();
  const [id, setUserId] = useState();
  const [task, setTask] = useState();
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  if (!auth.isAuthenticated()) {
    navigate('/login');
    return;
    }

  function handleNavigate(url) {
    return navigate(url);
  }

  async function handleDeleteComment(idComment) {
    await apiComment.deleteComment(idComment);

    setTask((prevTask) => ({
      ...prevTask,
      comments: prevTask.comments.filter((comment) => comment.id !== idComment),
    }));
  }

  useEffect(() => {
    async function getTask(id) {
      try {
        const userId = await auth.getId();
        setUserId(userId)

        const taskDetails = await apiTask.getTaskDetails(id);
        setTask(taskDetails);

        const getAuthor = await auth.getAuthor()
        setAuthor(getAuthor)

      } catch (error) {
        console.log("Erro ao tentar exibir a task com detalhes", error);
      }
    }

    getTask(taskId);
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />
      {!task ? (
        <p>Carregando detalhes da tarefa...</p>
      ) : (
        <div className="flex flex-col items-center justify-center min-w-2xl mb-6">
          <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
            <div className="flex flex-col border-b-1 border-b-gray-400">
              <h1 className="text-2xl font-bold text-center mb-5 text-gray-800 break-all">
                {task.title}
              </h1>

              <h3 className="text-center mb-6 text-gray-800 break-all">
                {task.description}
              </h3>

              <h3><span className="font-bold"> Solicitado por:  </span>{task.author}</h3>
               <button
                onClick={() => handleNavigate(`/task/set/${task.id}`)}
                className="text-xs self-end px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer mb-5"
                >
                Editar Tarefa
              </button>
            </div>

            {task.comments && task.comments.length > 0 ? (
              <div className="space-y-4 flex flex-col">
                {task.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm mt-4"
                  >
                    <p className="text-sm text-gray-600 mb-1 ">
                      <span className="font-semibold text-gray-800 break-all">
                        {comment.author}
                      </span>
                    </p>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-gray-800 break-all">{comment.comment}</p>
                       {comment.userId == id ? (
                       <div className="flex gap-2 mx-2">
                          <button
                          onClick={() =>
                            handleNavigate(
                              `/comment/set/${task.id}/${comment.id}`
                            )
                          }
                          className="text-xs px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          title="Excluir"
                          className="text-red-600 hover:text-red-800 transition cursor-pointer "
                        >
                          ❌
                        </button>
                      </div>
                          ) : ( 
                          <div></div>
                          )}
                        
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handleNavigate(`/task/addcomment/${task.id}`)}
                  className=" self-end text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer mb-2"
                >
                  + Adicionar comentário
                </button>
                <a href="/task" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-gray-500 text-center my-5">
                  Nenhum comentario para essa tarefa.
                </p>

                <button
                  onClick={() => handleNavigate(`/task/addcomment/${task.id}`)}
                  className=" self-end text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer mb-2"
                >
                  + Adicionar comentário
                </button>
                <a href="/task" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
              </div> 
            )}
          </div>
          
        </div>
      )}
    </div>
  );
}
