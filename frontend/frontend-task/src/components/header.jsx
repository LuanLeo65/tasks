"use client"

import { useNavigate } from "react-router-dom"
import icone from "../assets/lista-de-tarefas.png"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const TaskIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate("/login", { replace: true })
  }

  const NavLink = ({ to, icon: Icon, children, onClick }) => (
    <button
      onClick={() => {
        if (onClick) onClick()
        navigate(to)
        setMobileMenuOpen(false)
      }}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
    >
      <Icon />
      <span>{children}</span>
    </button>
  )

  return (
    <>
      {user ? (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={() => navigate("/home")}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                  <img src={icone || "/placeholder.svg"} alt="Tasks" className="w-6 h-6 invert" />
                </div>
                <span className="text-xl font-bold text-slate-900 hidden sm:block">TaskManager</span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <NavLink to="/home" icon={HomeIcon}>
                  Início
                </NavLink>
                <NavLink to="/Task" icon={TaskIcon}>
                  Tarefas
                </NavLink>
                <NavLink to="/profile" icon={UserIcon}>
                  Perfil
                </NavLink>
              </nav>

              {/* Logout Button Desktop */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogoutIcon />
                <span>Sair</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
                <nav className="flex flex-col gap-2">
                  <NavLink to="/home" icon={HomeIcon}>
                    Início
                  </NavLink>
                  <NavLink to="/Task" icon={TaskIcon}>
                    Tarefas
                  </NavLink>
                  <NavLink to="/profile" icon={UserIcon}>
                    Perfil
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200"
                  >
                    <LogoutIcon />
                    <span>Sair</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                  <img src={icone || "/placeholder.svg"} alt="Tasks" className="w-6 h-6 invert" />
                </div>
                <span className="text-xl font-bold text-slate-900">TaskManager</span>
              </div>
              <p className="text-sm text-slate-600 hidden sm:block">Bem-vindo ao sistema de Tarefas</p>
            </div>
          </div>
        </header>
      )}
    </>
  )
}
