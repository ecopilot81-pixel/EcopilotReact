import "./PuntosRecoleccion.css";

// Ubicaciones de Popayán que se muestran en las tarjetas y como marcadores.
const ubicaciones = [
  {
    id: 1,
    nombre: "C.C Terraplaza",
    direccion: "Carrera 9 # 24N-01, Popayán",
    horario: "Lun-Sáb: 10:00 AM - 8:00 PM",
    telefono: "+57 2 820 0000",
  },
  {
    id: 2,
    nombre: "EcoCampanario",
    direccion: "Calle 5 # 8-60, Popayán",
    horario: "Lun-Vie: 8:00 AM - 6:00 PM",
    telefono: "+57 2 833 3333",
  },
];

const PuntosRecoleccion = () => {
  // El mapa incrustado sin API key muestra la ciudad y evita guardar credenciales en el frontend.
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent("puntos de reciclaje, Popayán, Colombia")}&output=embed`;

  return (
    <div className="puntos-container">
      
      {/* Encabezado Principal */}
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Encuentra el punto de reciclaje más cercano a ti</p>
      </header>

      {/* El mapa se presenta primero; la lista de ubicaciones aparece debajo. */}
      <div className="puntos-content-layout">
        
        {/* Mapa interactivo de los puntos de recolección. */}
        <section className="mapa-section">
          <h2>Mapa Interactivo</h2>
          <div className="mapa-box">
            {/* Google Maps se incrusta directamente; los enlaces de cada tarjeta abren rutas específicas. */}
            <iframe
              className="google-map-frame"
              src={mapUrl}
              title="Mapa de puntos de reciclaje en Popayán"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* Lista de ubicaciones debajo del mapa. */}
        <section className="ubicaciones-section">
          <h2>Ubicaciones</h2>
          
          <div className="tarjetas-lista">
            {ubicaciones.map((lugar) => (
              <div key={lugar.id} className="ubicacion-card">
                
                {/* Icono del pin a la izquierda de la info */}
                <div className="card-icon-container">
                  <span className="geo-icon">📍</span>
                </div>

                {/* Detalles del lugar */}
                <div className="card-details">
                  <h3>{lugar.nombre}</h3>
                  <p className="detail-item">
                    <span className="icon-sub">🧭</span> {lugar.direccion}
                  </p>
                  <p className="detail-item">
                    <span className="icon-sub">🕒</span> {lugar.horario}
                  </p>
                  {lugar.telefono && (
                    <p className="detail-item">
                      <span className="icon-sub">📞</span> {lugar.telefono}
                    </p>
                  )}
                  
                  <a
                    className="btn-como-llegar"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lugar.direccion}, Colombia`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cómo Llegar
                  </a>
                </div>

              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
};

export default PuntosRecoleccion;