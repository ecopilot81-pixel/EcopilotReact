export default function MiColeccion() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Mi espacio</span>
        <h1>Mi colección</h1>
        <p>Consulta los artículos y recompensas obtenidos.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      <section className="visual-panel">
        <div className="visual-section-heading">
          <div><h2>Inventario</h2><p>Artículos asociados a tu cuenta.</p></div>
        </div>
        <div className="visual-empty-state visual-empty-state--compact">
          <span aria-hidden="true">🎒</span>
          <p>Los artículos de tu inventario aparecerán aquí al conectar el API.</p>
        </div>
      </section>

      <section className="visual-panel">
        <div className="visual-section-heading">
          <div><h2>Recompensas obtenidas</h2><p>Reconocimientos de temporadas y actividades.</p></div>
        </div>
        <div className="visual-empty-state visual-empty-state--compact">
          <span aria-hidden="true">🏅</span>
          <p>Las recompensas obtenidas aparecerán aquí al conectar el API.</p>
        </div>
      </section>
    </div>
  );
}
