export default function Reciclaje() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Participa</span>
        <h1>Mis actividades de reciclaje</h1>
        <p>Registra tus materiales y consulta el historial de tus aportes.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      {/* Indicadores vacíos reservan el espacio de los datos agregados del usuario. */}
      <section className="visual-stat-grid" aria-label="Resumen de reciclaje">
        <article className="visual-stat-card">
          <span aria-hidden="true">♻️</span>
          <strong>—</strong>
          <small>Registros de reciclaje</small>
        </article>
        <article className="visual-stat-card">
          <span aria-hidden="true">⭐</span>
          <strong>—</strong>
          <small>Puntos obtenidos</small>
        </article>
      </section>

      {/* El historial se llenará al conectar la consulta GET de reciclajes. */}
      <section className="visual-panel">
        <div className="visual-section-heading">
          <div>
            <h2>Historial de reciclaje</h2>
            <p>Consulta tus actividades y el estado de cada registro.</p>
          </div>
        </div>
        <div className="visual-empty-state visual-empty-state--compact">
          <span aria-hidden="true">📋</span>
          <p>El historial aparecerá aquí al conectar el API.</p>
        </div>
      </section>
    </div>
  );
}
