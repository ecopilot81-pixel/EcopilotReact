import { Link, useLocation } from "react-router-dom";
import ecopilotLog from "../assets/ecopilot log.png";

const Navbar = () => {
  const { pathname } = useLocation();

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

      {/* Home muestra el acceso; el resto de páginas conserva el menú completo. */}
      <ul className="nav-links">
        {pathname === "/" ? (
          <li>
            <Link to="/Login" className="nav-login">
              Iniciar sesión / Registro
            </Link>
          </li>
        ) : (
          <>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/puntos">Puntos de Recolección</Link></li>
            <li><Link to="/emprendimientos">Emprendimientos</Link></li>
            <li><Link to="/manualidades">Manualidades</Link></li>
            <li>
              <Link to="/Login" className="nav-login">
                Iniciar sesión / Registro
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
