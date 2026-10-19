export default function Comunidad() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Participación</span>
        <h1>Comunidad</h1>
        <p>Consulta las opiniones y el historial de conversaciones.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · la vista aún no está conectada al API</p>

      <div className="visual-two-column">
        <section className="visual-panel">
          <h2>Opiniones visibles</h2>
          {/* Solo se deja el espacio de lectura; no se añade un formulario de envío POST. */}
          <div className="visual-empty-state visual-empty-state--compact">
            <span aria-hidden="true">⭐</span>
            <p>Las opiniones aparecerán aquí al conectar el API.</p>
          </div>
        </section>

        <section className="visual-panel">
          <h2>Historial de chat</h2>
          {/* El historial se mostrará aquí mediante lectura GET en una fase posterior. */}
          <div className="visual-empty-state visual-empty-state--compact">
            <span aria-hidden="true">💬</span>
            <p>Las conversaciones aparecerán aquí al conectar el API.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
