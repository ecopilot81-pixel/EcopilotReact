import { Link, useLocation } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      {pathname !== "/" && (
        <Link to="/" className="logo" aria-label="Eco-Pilot, ir al inicio">
          <img src={ecoPilotLogo} alt="Eco-Pilot" />
        </Link>
      )}
      
      <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/puntos">Puntos de Recolección</Link></li> {/* ✔ */}
          <li><Link to="/emprendimientos">Emprendimientos</Link></li>
          <li><Link to="/Manualidades">Manualidades</Link></li>
          <li><Link to="/Login" className="nav-login">Iniciar sesión / Registro</Link></li>
        </ul>

    </nav>
  )
}
export default Navbar
