import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ecopilotLog from "../assets/ecopilot log.png";
import NavigationMenu from "./NavigationMenu";

const Navbar = ({ auth }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = auth;
  const [logoutError, setLogoutError] = useState("");
  const [buscandoPuntoCercano, setBuscandoPuntoCercano] = useState(false);

  // Obtiene la ubicación y la entrega a la página de puntos sin guardarla.
  function handleNearbyPoints() {
    if (!navigator.geolocation) {
      navigate("/puntos", {
        state: { errorUbicacion: "Tu navegador no permite consultar la ubicación actual." },
      });
      return;
    }

    setBuscandoPuntoCercano(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        navigate("/puntos", {
          state: {
            ubicacionUsuario: { lat: coords.latitude, lng: coords.longitude },
          },
        });
        setBuscandoPuntoCercano(false);
      },
      (error) => {
        const mensajes = {
          1: "Permite el acceso a tu ubicación para encontrar el punto más cercano.",
          2: "No fue posible determinar tu ubicación. Inténtalo de nuevo.",
          3: "La consulta de ubicación tardó demasiado. Inténtalo de nuevo.",
        };
        navigate("/puntos", {
          state: {
            errorUbicacion: mensajes[error.code] || "No fue posible consultar tu ubicación.",
          },
        });
        setBuscandoPuntoCercano(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

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

  // La clase home permite aplicar los ajustes específicos del encabezado principal.
  return (
    <nav className={pathname === "/" ? "navbar home" : "navbar"}>
      <Link to="/" className="logo" aria-label="Ir al inicio">
        <img src={ecopilotLog} alt="Eco-Pilot" />
        {pathname !== "/" && (
          <span>Ir al inicio</span>
        )}
      </Link>

      <div className="navbar-actions">
        <ul className="nav-links">{authAction}</ul>
        <button
          type="button"
          className="navbar-location-button"
          onClick={handleNearbyPoints}
          disabled={buscandoPuntoCercano}
          aria-label={
            buscandoPuntoCercano
              ? "Buscando tu ubicación"
              : "Buscar puntos de recolección cercanos a mi ubicación"
          }
          title="Puntos de recolección cercanos"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.25" />
          </svg>
        </button>
        <NavigationMenu />
      </div>
      {logoutError && <p className="navbar-auth-error" role="alert">{logoutError}</p>}
    </nav>
  );
};

export default Navbar;
