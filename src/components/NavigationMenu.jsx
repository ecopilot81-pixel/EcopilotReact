import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationMenu() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div
      className="navigation-menu"
      onMouseEnter={() => setMenuAbierto(true)}
      onMouseLeave={() => setMenuAbierto(false)}
      onFocus={() => setMenuAbierto(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuAbierto(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMenuAbierto(false);
        }
      }}
    >
      <button
        className="navigation-menu__toggle"
        type="button"
        aria-expanded={menuAbierto}
        aria-controls="navigation-menu-list"
        onClick={() => setMenuAbierto(true)}
      >
        <span>Menú</span>
        <span className="navigation-menu__icon" aria-hidden="true" />
      </button>
      <nav
        className="navigation-menu__dropdown"
        id="navigation-menu-list"
        aria-label="Navegación principal"
        hidden={!menuAbierto}
        onClick={() => setMenuAbierto(false)}
      >
        <ul className="navigation-menu__links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/perfil">Mi perfil</Link></li>
          <li><Link to="/puntos">Puntos de recolección</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/manualidades">Manualidades</Link></li>
          <li><Link to="/conocimiento">Conocimiento</Link></li>
          <li><Link to="/reciclaje">Mis actividades</Link></li>
          <li><Link to="/ranking">Ranking</Link></li>
          <li><Link to="/recompensas">Recompensas</Link></li>
          <li><Link to="/coleccion">Mi colección</Link></li>
          <li><Link to="/chatbot">Chatbot IA</Link></li>
        </ul>
      </nav>
    </div>
  );
}
