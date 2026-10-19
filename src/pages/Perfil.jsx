export default function Perfil() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Mi espacio</span>
        <h1>Mi perfil</h1>
        <p>Consulta tu información y el progreso de tus acciones ambientales.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      <section className="visual-profile-card">
        <div className="visual-avatar" aria-hidden="true">🌎</div>
        <div className="visual-profile-info">
          <span className="visual-tag">Perfil</span>
          <h2>Tu nombre aparecerá aquí</h2>
          <p>Alias · ciudad</p>
          <p>Tu biografía aparecerá aquí cuando conectemos el API.</p>
        </div>
      </section>

      <section className="visual-stat-grid" aria-label="Resumen del perfil">
        <article className="visual-stat-card"><span>♻️</span><strong>—</strong><small>Puntos acumulados</small></article>
        <article className="visual-stat-card"><span>🌱</span><strong>—</strong><small>Actividades realizadas</small></article>
        <article className="visual-stat-card"><span>🏆</span><strong>—</strong><small>Recompensas obtenidas</small></article>
      </section>

      <section className="visual-panel">
        <div className="visual-section-heading">
          <div><h2>Progreso de temporada</h2><p>Avanza con tus actividades y descubre nuevas recompensas.</p></div>
          <span className="visual-tag">Nivel —</span>
        </div>
        {/* El indicador conserva su espacio; el valor se calculará al conectar el API. */}
        <div className="visual-progress-track" aria-label="Progreso de experiencia">
          <span className="visual-progress-track__placeholder" />
        </div>
        <div className="visual-progress-caption"><span>— XP</span><span>Meta siguiente nivel: — XP</span></div>
      </section>
    </div>
  );
}
