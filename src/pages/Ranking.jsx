export default function Ranking() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Comunidad</span>
        <h1>Ranking semanal</h1>
        <p>Reconocemos a quienes suman acciones positivas para el planeta.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      <section className="visual-panel visual-panel--narrow">
        <div className="visual-section-heading">
          <div>
            <h2>Esta semana</h2>
            <p>Clasificación de participantes por puntos</p>
          </div>
        </div>

        <div className="visual-empty-state visual-empty-state--compact">
          <span aria-hidden="true">🏆</span>
          <p>Las posiciones y los puntajes se mostrarán aquí al conectar el API.</p>
        </div>
      </section>
    </div>
  );
}
