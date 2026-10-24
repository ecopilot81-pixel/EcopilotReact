import { Link } from "react-router-dom";

export default function Conocimiento() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Explora y aprende</span>
        <h1>Conocimiento</h1>
        <p>Investiga y descubre novedades científicas sobre sostenibilidad y medio ambiente.</p>
      </header>

      <div className="knowledge-grid">
        <Link className="visual-panel knowledge-card" to="/investigacion">
          <span className="knowledge-card__icon" aria-hidden="true">🔎</span>
          <h2>Investigación</h2>
          <p>Explora recursos e iniciativas de investigación ambiental.</p>
          <span className="knowledge-card__action">Explorar investigación <span aria-hidden="true">→</span></span>
        </Link>

        <Link className="visual-panel knowledge-card" to="/noticias">
          <span className="knowledge-card__icon" aria-hidden="true">📰</span>
          <h2>Noticias y publicaciones científicas</h2>
          <p>Consulta noticias y publicaciones compartidas por la comunidad.</p>
          <span className="knowledge-card__action">Ver publicaciones <span aria-hidden="true">→</span></span>
        </Link>
      </div>
    </div>
  );
}
