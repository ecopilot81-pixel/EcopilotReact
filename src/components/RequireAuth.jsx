import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Espera a comprobar la sesión y devuelve a Login las rutas personales sin acceso.
export default function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p role="status" className="visual-data-message">Verificando la sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
