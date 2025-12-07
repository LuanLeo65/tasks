import Header from "../../../components/header"
import apiLogin from "../../../services/login"
import apiComments from "../../../services/comment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfileComments() {
  const [comments, setComment] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!apiLogin.isAuthenticated()) {
      navigate("/login")
      return
    }

    async function handleComments() {
      try {
        const id = await apiLogin.getId()
        const responseComments = await apiComments.getAllUserComments(id)
        setComment(responseComments)
      } catch (error) {
        console.log("Erro durante a chamada de comentários", error)
      } finally {
        setLoading(false)
      }
    }
    handleComments()
  }, [])

  function handleNavigate(url) {
    return navigate(url)
  }

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      async function deleteComment() {
        await apiComments.deleteComment(id)
        setComment((prev) => prev.filter((comments) => comments.id !== id))
      }
      deleteComment()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Seus Comentários</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : comments && comments.length > 0 ? (
            <>
              <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        ID Tarefa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Comentário
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {comments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">#{comment.taskId}</td>
                        <td className="px-6 py-4 text-sm text-slate-800 max-w-md truncate">{comment.comment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleNavigate(`/task/details/${comment.taskId}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Ver tarefa"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(comment.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Excluir"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500">Tarefa #{comment.taskId}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleNavigate(`/task/details/${comment.taskId}`)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-800 line-clamp-2">{comment.comment}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleNavigate("/profile")}
                className="mt-6 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ← Voltar ao perfil
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <p className="text-slate-600 mb-6">Você não tem nenhum comentário</p>
              <button
                onClick={() => handleNavigate("/profile")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ← Voltar ao perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
