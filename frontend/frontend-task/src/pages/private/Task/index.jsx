//pages/dashboard/index.js
import React, { useState, useEffect } from "react";
import ApiTask from "../../../services/task";
import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";
import auth from "../../../services/login";

export default function Dashboard() {
  const [tasks, setTask] = useState([]);
  const navigate = useNavigate();

  function handleNavigate(url) {
    return navigate(url);
  }

   if (!auth.isAuthenticated()) {
        navigate('/login');
        return;
    }
  

  async function handleDelete(id) {
    await ApiTask.deleteTask(id);
    setTask((prev) => prev.filter((task) => task.id !== id));
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await ApiTask.getAll();

        setTask(response);
      } catch (error) {
        console.log("Erro durante a chamada de tarefas", error);
      }
    }

    getTasks();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
      <Header />

      <div>
        {tasks && tasks.length > 0 ? (
          <>
            <h1 className="text-center text-5xl text-[#A4193D] font-bold mb-10">Tarefas da Empresa</h1>
            <div className="flex justify-end w-300">
              <button
                onClick={() => {
                  handleNavigate("/addtask");
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition cursor-pointer mb-2"
              >
                + Nova Tarefa
              </button>
            </div>
            <div className="overflow-x-auto w-full rounded-xl shadow-md">
              <table className="min-w-full text-sm text-left text-gray-700 bg-white">
                <thead className="text-xs uppercase bg-gray-200 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-center">Numero</th>
                    <th className="px-6 py-3 ">Tarefa</th>
                    <th className="px-6 py-3 ">Descrição</th>
                    <th className="px-6 py-3 text-center ">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {tasks.map((task, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="px-2 py-4 w-10 truncate text-center">
                        {task.id}
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 max-w-[300px] truncate">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 text-center ">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() =>
                              handleNavigate(`/task/details/${task.id}`)
                            }
                            className=" text-blue-600 hover:text-blue-800 transition cursor-pointer text-1xl"
                            title="Ver detalhes"
                          >
                            ☰
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
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
          </>
        ) : (
          <>
            <div className="w-full flex justify-center mb-5">
              <p className="text-1xl text-gray-600 bg-[#ffffff] p-4 rounded-2xl shadow-md">
                <span className="font-bold mb-6 text-center text-[#a4193ece]">
                Nenhuma tarefa adicionada
                </span>
              </p>
            </div>
            <div className="flex justify-center w-300">
              <button
                onClick={() => {
                  handleNavigate("/addtask");
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition cursor-pointer"
              >
                + Nova Tarefa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
