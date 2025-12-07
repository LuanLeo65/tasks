import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../../components/header"
import apiLogin from "../../../services/login"

export default function Profile() {
  const [nome, setNome] = useState("")
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    if (!apiLogin.isAuthenticated()) {
      navigate("/login")
      return
    }

    async function getInfo() {
      try {
        const id = await apiLogin.getId()
        const response = await apiLogin.getAccount(id)
        setNome(response.data.name)
        setUser(response.data)
      } catch (error) {
        console.log("Erro ao carregar perfil", error)
      } finally {
        setLoading(false)
      }
    }
    getInfo()
  }, [])

  const formattedDate = user?.birth ? user.birth.split("T")[0].split("-").reverse().join("/") : ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Perfil do Usuário</h1>
                <p className="text-slate-600">Gerencie suas informações pessoais</p>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <span className="text-white text-2xl font-bold">{getUserInitials(nome)}</span>
                </div>
                <button
                  onClick={() => navigate("/profile/edit")}
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
                  Editar Perfil
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Nome</label>
                  <p className="text-slate-800">{nome}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Email</label>
                  <p className="text-slate-800">{user?.email || "Carregando..."}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Data de Nascimento</label>
                  <p className="text-slate-800">{formattedDate || "Não informado"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/profile/tasks")}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Suas Tarefas
                </button>

                <button
                  onClick={() => navigate("/profile/comments")}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Seus Comentários
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
