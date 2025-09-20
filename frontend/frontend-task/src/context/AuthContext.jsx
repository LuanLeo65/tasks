// contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import apiLogin from "../services/login";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // estado do usuário logado
  const [loading, setLoading] = useState(true); // estado de carregamento inicial

  useEffect(() => {
    async function checkAuth() {
      const token = apiLogin.getToken();
      const userId = apiLogin.getId();

      if (!token || !userId) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await apiLogin.getAccount(userId); // valida token no backend
        setUser(res.data);
      } catch {
        // se token inválido ou expirado
        logout();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = (data) => {
    apiLogin.setToken(data.token);
    apiLogin.setId(data.user.id);
    apiLogin.setAuthor(data.user.name);
    setUser(data.user); // atualiza o estado global
  };

  const logout = () => {
    apiLogin.setToken("");
    apiLogin.setId("");
    apiLogin.setAuthor("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
