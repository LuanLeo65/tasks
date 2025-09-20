import React, { useState, useEffect } from "react";
import Header from "../../../components/header";
import apiTask from "../../../services/task";
import { useNavigate } from "react-router-dom";
import auth from "../../../services/login";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  if (!auth.isAuthenticated()) {
    navigate('/login');
    return;
    }

  async function handleAddTask(e) {
    e.preventDefault();

    const payload = {
      title: title,
      description: description,
    };

    if (!payload.title || !payload.description) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const add = await apiTask.addTask(payload);
      setSuccessMessage("Tarefa adicionada com sucesso");

      setTimeout(() => {
        navigate("/task");
      }, 2000);
    } catch (error) {
      console.log("Erro ao adicionar uma tarefa:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center  bg-[#FFDFB9]">
        <Header />

        {successMessage ? (
          <p className="text-lg text-white mt-4 bg-green-500  rounded-2xl p-5 shadow-2xl">{successMessage}</p>
        ) : (
 
          <form className="w-[90%] max-w-md mx-auto bg-white p-6 rounded-3xl shadow-lg mt-8 space-y-4 mb-6" onSubmit={handleAddTask}>
            <div>
              <label className="block mb-1 font-semibold text-gray-800">Assunto da Tarefa:</label>
              <input
                type="text"
                value={title}
                placeholder="Escreva a tarefa."
                className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">Descrição:</label>
              <textarea
                value={description}
                placeholder="Escreva com detalhes a tarefa."
                className="w-full border border-gray-400 rounded-xl px-3 py-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-300"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition">
             + Adicionar Tarefa
            </button>
            <a href="/task" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
          </form>
          
        )}
      </div>
    </>
  );
}
