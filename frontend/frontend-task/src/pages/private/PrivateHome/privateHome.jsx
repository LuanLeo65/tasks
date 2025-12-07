import Header from "../../../components/header"
import apiLogin from "../../../services/login"
import { useNavigate } from "react-router-dom"

export default function PrivateHome() {
  const navigate = useNavigate()

  if (!apiLogin.isAuthenticated()) {
    navigate("/login")
    return
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">Bem-vindo à sua área privada!</h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Aqui você pode gerenciar suas tarefas de forma eficiente e organizada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <button
              onClick={() => navigate("/task")}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Minhas Tarefas</h3>
              <p className="text-sm text-slate-600">Visualize e gerencie suas tarefas</p>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Meu Perfil</h3>
              <p className="text-sm text-slate-600">Gerencie suas informações</p>
            </button>

            <button
              onClick={() => navigate("/addtask")}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Nova Tarefa</h3>
              <p className="text-sm text-slate-600">Crie uma nova tarefa</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
