import React from "react";
import "./PuntosRecoleccion.css";

const PuntosRecoleccion = () => {
  // Datos de prueba basados exactamente en tu captura de Popayán
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
    }
  ];

  return (
    <div className="puntos-container">
      
      {/* Encabezado Principal */}
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Encuentra el punto de reciclaje más cercano a ti</p>
      </header>

      {/* Contenido en dos columnas (Mapa a la izquierda, Tarjetas a la derecha) */}
      <div className="puntos-content-layout">
        
        {/* COLUMNA IZQUIERDA: Mapa Interactivo */}
        <section className="mapa-section">
          <h2>Mapa Interactivo</h2>
          <div className="mapa-box">
            {/* Aquí simulamos el mapa con los pines verdes del diseño */}
            <div className="mapa-placeholder">
              <div className="pin pin-1">📍</div>
              <div className="pin pin-2">📍</div>
              <div className="pin pin-3">📍</div>
            </div>
          </div>
        </section>

        {/* COLUMNA DERECHA: Lista de Ubicaciones */}
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
                  
                  <button className="btn-como-llegar">Cómo Llegar</button>
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