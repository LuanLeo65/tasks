import Header from "../../../components/header"
import apiLogin from "../../../services/login"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ProfileEdit() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birth, setBirthdate] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  if (!apiLogin.isAuthenticated()) {
    navigate("/login")
    return
  }

  async function handleUpdate(e) {
    e.preventDefault()

    if (!name && !email && !birth) {
      alert("Preencha pelo menos um campo para atualizar")
      return
    }

    setLoading(true)

    try {
      const id = await apiLogin.getId()
      const updatedUser = {
        name,
        email,
        birth,
      }
      await apiLogin.setAccount(id, updatedUser)
      alert("Perfil atualizado com sucesso!")
      navigate("/profile")
    } catch (error) {
      console.log("Erro ao atualizar o perfil", error)
      alert("Erro ao atualizar o perfil. Tente novamente.")
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
              onClick={() => navigate("/profile")}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Editar Perfil</h1>
              <p className="text-slate-600 mt-1">Atualize suas informações pessoais</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome</label>
              <input
                type="text"
                value={name}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Digite seu email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Data de Nascimento</label>
              <input
                type="date"
                value={birth}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setBirthdate(e.target.value)}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Salvar Alterações
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
