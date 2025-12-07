import { useParams, useNavigate } from "react-router-dom"
import Header from "../../../components/header"
import apiTask from "../../../services/task"
import apiComment from "../../../services/comment"
import { useEffect, useState } from "react"
import auth from "../../../services/login"

export default function Details() {
  const [author, setAuthor] = useState()
  const [id, setUserId] = useState()
  const [task, setTask] = useState()
  const [loading, setLoading] = useState(true)
  const { id: taskId } = useParams()
  const navigate = useNavigate()

  const handleNavigate = (url) => {
    return navigate(url)
  }

  const handleDeleteComment = async (idComment) => {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      await apiComment.deleteComment(idComment)
      setTask((prevTask) => ({
        ...prevTask,
        comments: prevTask.comments.filter((comment) => comment.id !== idComment),
      }))
    }
  }

  useEffect(() => {
    const getTask = async (id) => {
      try {
        const userId = await auth.getId()
        setUserId(userId)

        const taskDetails = await apiTask.getTaskDetails(id)
        setTask(taskDetails)

        const getAuthor = await auth.getAuthor()
        setAuthor(getAuthor)
      } catch (error) {
        console.log("Erro ao tentar exibir a task com detalhes", error)
      } finally {
        setLoading(false)
      }
    }

    if (!auth.isAuthenticated()) {
      navigate("/login")
      return
    }

    getTask(taskId)
  }, [taskId, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !task ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Erro ao carregar detalhes da tarefa</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <button
                onClick={() => navigate("/task")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>

              <div className="border-b border-slate-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-4 break-words">{task.title}</h1>
                <p className="text-slate-600 text-lg mb-4 break-words leading-relaxed">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>
                      Solicitado por: <span className="font-semibold text-slate-700">{task.author}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleNavigate(`/task/set/${task.id}`)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Editar Tarefa
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Comentários</h2>
                  <button
                    onClick={() => handleNavigate(`/task/addcomment/${task.id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar
                  </button>
                </div>

                {task.comments && task.comments.length > 0 ? (
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <span className="font-semibold text-slate-800">{comment.author}</span>
                            </div>
                            <p className="text-slate-700 break-words leading-relaxed">{comment.comment}</p>
                          </div>
                          {comment.userId == id && (
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleNavigate(`/comment/set/${task.id}/${comment.id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Editar"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Excluir"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-500 mb-4">Nenhum comentário para essa tarefa</p>
                    <button
                      onClick={() => handleNavigate(`/task/addcomment/${task.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Seja o primeiro a comentar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
