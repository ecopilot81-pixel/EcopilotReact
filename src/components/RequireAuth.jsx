import { Navigate, Outlet, useLocation } from "react-router-dom";

// Espera a comprobar la sesión y devuelve a Login las rutas personales sin acceso.
export default function RequireAuth({ auth }) {
  const { user, loading } = auth;
  const location = useLocation();

  if (loading) {
    return <p role="status" className="visual-data-message">Verificando la sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
