import { useState } from "react"
import Header from "../../../components/header"
import apiTask from "../../../services/task"
import { useNavigate, useParams } from "react-router-dom"
import auth from "../../../services/login"

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

export default function SetTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const { id: taskId } = useParams()
  const navigate = useNavigate()

  if (!auth.isAuthenticated()) {
    navigate("/login")
    return
  }

  async function handleSetTask(e) {
    e.preventDefault()

    const payload = {
      title: title,
      description: description,
    }

    if (!payload.title || !payload.description) {
      alert("Preencha todos os campos")
      return
    }

    try {
      setLoading(true)
      const set = await apiTask.setTask(taskId, payload)
      setSuccessMessage("Tarefa alterada com sucesso")

      setTimeout(() => {
        navigate(`/task/details/${taskId}`)
      }, 2000)
    } catch (error) {
      console.log("Erro ao alterar uma tarefa:", error)
      alert("Erro ao alterar a tarefa. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {successMessage ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircleIcon />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sucesso!</h2>
              <p className="text-slate-600">{successMessage}</p>
              <p className="text-sm text-slate-500 mt-4">Redirecionando...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <button
                  onClick={() => navigate(`/task/details/${taskId}`)}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-4 transition-colors duration-150"
                >
                  <ArrowLeftIcon />
                  Voltar
                </button>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Editar Tarefa</h1>
                <p className="text-slate-600">Atualize as informações da tarefa abaixo</p>
              </div>

              <form className="bg-white rounded-xl shadow-sm border border-slate-200 p-8" onSubmit={handleSetTask}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Título da Tarefa</label>
                    <input
                      type="text"
                      value={title}
                      placeholder="Digite o título da tarefa"
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição</label>
                    <textarea
                      value={description}
                      placeholder="Descreva os detalhes da tarefa"
                      rows={6}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150 resize-none"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <EditIcon />
                          Salvar Alterações
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/task/details/${taskId}`)}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors duration-150"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
