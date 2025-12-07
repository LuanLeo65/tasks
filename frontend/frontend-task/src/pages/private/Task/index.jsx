import { useState, useEffect } from "react"
import ApiTask from "../../../services/task"
import Header from "../../../components/header"
import { useNavigate } from "react-router-dom"
import auth from "../../../services/login"

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const EmptyIcon = () => (
  <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
)

export default function Dashboard() {
  const [tasks, setTask] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/login")
      return
    }

    async function getTasks() {
      try {
        setLoading(true)
        const response = await ApiTask.getAll()
        setTask(response)
      } catch (error) {
        console.error("Erro durante a chamada de tarefas", error)
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [])

  function handleNavigate(url) {
    return navigate(url)
  }

  async function handleDelete(id, title) {
    const confirmed = window.confirm(`Tem certeza que deseja excluir a tarefa "${title}"?`)
    if (confirmed) {
      try {
        await ApiTask.deleteTask(id)
        setTask((prev) => prev.filter((task) => task.id !== id))
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error)
        alert("Erro ao deletar tarefa. Tente novamente.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Carregando tarefas...</p>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Tarefas da Empresa</h1>
                <p className="text-slate-600">
                  Total de {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"}
                </p>
              </div>
              <button
                onClick={() => handleNavigate("/addtask")}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <PlusIcon />
                Nova Tarefa
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Tarefa
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                        Descrição
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tasks.map((task, index) => (
                      <tr key={task.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{task.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900 max-w-xs truncate">{task.title}</div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="text-sm text-slate-600 max-w-md truncate">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleNavigate(`/task/details/${task.id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                              title="Ver detalhes"
                            >
                              <EyeIcon />
                            </button>
                            <button
                              onClick={() => handleDelete(task.id, task.title)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                              title="Excluir"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="flex justify-center mb-6">
              <EmptyIcon />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Nenhuma tarefa encontrada</h2>
            <p className="text-slate-600 mb-8">Comece criando sua primeira tarefa para organizar seu trabalho</p>
            <button
              onClick={() => handleNavigate("/addtask")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <PlusIcon />
              Criar Nova Tarefa
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
