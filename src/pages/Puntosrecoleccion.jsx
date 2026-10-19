const PuntosRecoleccion = () => {
  return (
    <div className="puntos-container">
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Encuentra el punto de reciclaje más cercano a ti</p>
      </header>

      <div className="puntos-content-layout">
        <section className="mapa-section">
          <h2>Mapa Interactivo</h2>
          <div className="mapa-box">
            {/* Mapa incrustado de Google; los puntos de recolección se conectarán después. */}
            <iframe
              className="google-map"
              title="Mapa de Popayán"
              src="https://maps.google.com/maps?q=Popay%C3%A1n%2C%20Colombia&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <section className="ubicaciones-section">
          <h2>Ubicaciones</h2>
          <div className="visual-empty-state visual-empty-state--compact">
            <span aria-hidden="true">📍</span>
            <p>Las ubicaciones aparecerán aquí cuando se conecten los datos de recolección.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PuntosRecoleccion;