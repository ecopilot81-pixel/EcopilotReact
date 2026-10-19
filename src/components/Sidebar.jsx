import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Explorar</h2>
      <nav aria-label="Navegación lateral">
        <ul className="sidebar__links">
          {/* Enlaces directos: la navegación funciona sin estados, arreglos ni lógica extra. */}
          <li>
            <Link className="sidebar__link" to="/">Inicio</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/puntos">Puntos de recolección</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/emprendimientos">Emprendimientos</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/manualidades">Manualidades</Link>
          </li>
          {/* Navegación a las pantallas visuales que corresponden a los módulos del backend. */}
          <li>
            <Link className="sidebar__link" to="/noticias">Noticias</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/reciclaje">Mis actividades</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/perfil">Mi perfil</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/tienda">Tienda</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/coleccion">Mi colección</Link>
          </li>
          <li>
            <Link className="sidebar__link" to="/comunidad">Comunidad</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
