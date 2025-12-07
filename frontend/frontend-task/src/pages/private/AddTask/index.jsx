import { useState } from "react"
import Header from "../../../components/header"
import apiTask from "../../../services/task"
import { useNavigate } from "react-router-dom"
import auth from "../../../services/login"

export default function AddTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  if (!auth.isAuthenticated()) {
    navigate("/login")
    return
  }

  async function handleAddTask(e) {
    e.preventDefault()

    const payload = {
      title: title,
      description: description,
    }

    if (!payload.title || !payload.description) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)

    try {
      await apiTask.addTask(payload)
      setSuccessMessage("Tarefa adicionada com sucesso")

      setTimeout(() => {
        navigate("/task")
      }, 2000)
    } catch (error) {
      console.log("Erro ao adicionar uma tarefa:", error)
      alert("Erro ao adicionar tarefa. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/task")}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Adicionar Tarefa</h1>
              <p className="text-slate-600 mt-1">Crie uma nova tarefa para gerenciar</p>
            </div>
          </div>

          {successMessage ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-slate-800">{successMessage}</p>
              <p className="text-sm text-slate-600 mt-2">Redirecionando...</p>
            </div>
          ) : (
            <form onSubmit={handleAddTask} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Assunto da Tarefa</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Ex: Revisar documentação do projeto"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição</label>
                <textarea
                  value={description}
                  placeholder="Descreva detalhadamente a tarefa..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Adicionar Tarefa
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/task")}
                  className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
