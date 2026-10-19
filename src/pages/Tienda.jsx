export default function Tienda() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Recompensas</span>
        <h1>Tienda Eco-Pilot</h1>
        <p>Explora artículos y beneficios disponibles para la comunidad.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      <section className="visual-wallet">
        <span aria-hidden="true">🪙</span>
        <div><small>Tu saldo</small><strong>— monedas</strong></div>
      </section>

      {/* Espacio de categorías, sin filtros que todavía no tengan datos ni comportamiento. */}
      <section className="visual-panel visual-store-section">
        <h2>Categorías</h2>
        <div className="visual-empty-state visual-empty-state--compact">
          <p>Las categorías de la tienda aparecerán aquí al conectar el API.</p>
        </div>
      </section>

      {/* Espacio de artículos; la acción de canje se agregará con su integración. */}
      <section className="visual-empty-state" aria-label="Artículos disponibles">
        <span aria-hidden="true">🛍️</span>
        <h2>Los artículos aparecerán aquí</h2>
        <p>La tienda mostrará sus artículos cuando conectemos el API.</p>
      </section>
      <p className="visual-footnote">Los canjes se habilitarán en una fase posterior.</p>
    </div>
  );
}
