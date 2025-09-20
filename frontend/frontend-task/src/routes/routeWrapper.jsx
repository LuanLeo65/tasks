import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute(){
const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Carregando...</p>;

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}