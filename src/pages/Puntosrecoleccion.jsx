const PuntosRecoleccion = () => {
  return (
    <div className="puntos-container">
      
      {/* Encabezado Principal */}
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Encuentra el punto de reciclaje más cercano a ti</p>
      </header>

      {/* El mapa conserva su espacio visual mientras los puntos reales se incorporan más adelante. */}
      <div className="puntos-content-layout">
        
        {/* Mapa interactivo de los puntos de recolección. */}
        <section className="mapa-section">
          <h2>Mapa Interactivo</h2>
          <div className="mapa-box">
            {/* Reserva el área del mapa sin consultar servicios externos durante la fase visual. */}
            <div className="mapa-placeholder">
              <span aria-hidden="true">🗺️</span>
              <strong>El mapa se mostrará aquí</strong>
              <p>Las ubicaciones aparecerán en esta área al integrar los datos.</p>
            </div>
          </div>
        </section>

        {/* Reserva el área donde aparecerán las tarjetas cuando se integren los datos. */}
        <section className="ubicaciones-section">
          <h2>Ubicaciones</h2>
          <div className="visual-empty-state visual-empty-state--compact">
            <span aria-hidden="true">📍</span>
            <p>Las ubicaciones y sus detalles aparecerán aquí al integrar los datos.</p>
          </div>

        </section>

      </div>
    </div>
  );
};

export default PuntosRecoleccion;