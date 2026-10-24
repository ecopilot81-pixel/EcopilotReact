import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ecopilotLog from "../assets/ecopilot log.png";
import { useAuth } from "../context/useAuth";
import NavigationMenu from "./NavigationMenu";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");

  // Finaliza la sesión web antes de regresar a la página de acceso.
  async function handleLogout() {
    setLogoutError("");

    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      setLogoutError(error.message);
    }
  }

  const authAction = loading ? null : user ? (
    <>
      <li className="nav-user">Hola, {user.name}</li>
      <li>
        <button type="button" className="nav-login" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </li>
    </>
  ) : (
    <li>
      <Link to="/Login" className="nav-login">
        Iniciar sesión / Registro
      </Link>
    </li>
  );

  // La clase home identifica este Navbar para alinear su único enlace a la derecha.
  return (
    <nav className={pathname === "/" ? "navbar home" : "navbar"}>
      {/* En Home se oculta este acceso para conservar el diseño del encabezado; aparece en las demás páginas. */}
      {pathname !== "/" && (
        <Link to="/" className="logo" aria-label="Ir al inicio">
          {/* Reutiliza el logo de Eco-Pilot como acceso visual a la página principal. */}
          <img src={ecopilotLog} alt="Eco-Pilot" />
          {/* El texto indica explícitamente el destino del enlace. */}
          <span>Ir al inicio</span>
        </Link>
      )}

      <div className="navbar-actions">
        <ul className="nav-links">{authAction}</ul>
        <NavigationMenu />
      </div>
      {logoutError && <p className="navbar-auth-error" role="alert">{logoutError}</p>}
    </nav>
  );
};

export default Navbar;
