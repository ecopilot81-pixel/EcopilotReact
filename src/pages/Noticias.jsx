export default function Noticias() {
  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Novedades</span>
        <h1>Noticias ambientales</h1>
        <p>Información y novedades para una comunidad más sostenible.</p>
      </header>

      <p className="visual-demo-notice">Estructura visual · los registros se cargarán desde el API</p>

      {/* Reserva el área donde se mostrarán noticias sin incluir datos escritos a mano. */}
      <section className="visual-empty-state" aria-label="Lista de noticias">
        <span aria-hidden="true">📰</span>
        <h2>Aquí aparecerán las noticias</h2>
        <p>El contenido se mostrará cuando conectemos esta vista con el API.</p>
      </section>
    </div>
  );
}
