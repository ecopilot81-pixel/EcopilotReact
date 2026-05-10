import { useState } from "react";
import "./PuntosRecoleccion.css";

const PuntosRecoleccion = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const points = [
    {
      id: 1,
      name: "C.C Terraplaza",
      address: "Carrera 9 # 24N-01, Popayán",
      hours: "Lun-Sáb: 10:00 AM - 8:00 PM",
      phone: "+57 2 820 0000",
      lat: 2.4527,
      lng: -76.6057,
    },
    {
      id: 2,
      name: "EcoCampanario",
      address: "Calle 5 # 8-60, Popayán",
      hours: "Lun-Vie: 8:00 AM - 6:00 PM",
      phone: "+57 312 456 7890",
      lat: 2.4422,
      lng: -76.6063,
    },
    {
      id: 3,
      name: "Barrio El Uvo",
      address: "Carrera 15 con Calle 18N, Popayán",
      hours: "Lun-Dom: 7:00 AM - 5:00 PM",
      phone: "+57 300 123 4567",
      lat: 2.4583,
      lng: -76.5989,
    },
    {
      id: 4,
      name: "Barrio El Empedrado",
      address: "Calle 3 # 12-45, Popayán",
      hours: "Mar-Sáb: 9:00 AM - 4:00 PM",
      phone: "+57 315 987 6543",
      lat: 2.4391,
      lng: -76.6128,
    },
  ];

  return (
    <div className="puntos">

      <h1>Puntos de Recolección en Popayán</h1>
      <p>Encuentra el punto de reciclaje más cercano a ti</p>

      <div className="container">

        {/* Mapa */}
        <div className="mapa">
          <h2>Mapa Interactivo</h2>

          <div className="map-box">
            {points.map((point) => (
              <div
                key={point.id}
                className={`marker ${
                  selectedPoint === point.id ? "active" : ""
                }`}
                onClick={() => setSelectedPoint(point.id)}
                style={{
                  left: `${((point.lng + 76.62) / 0.02) * 100}%`,
                  top: `${100 - ((point.lat - 2.43) / 0.03) * 100}%`,
                }}
              >
                📍
              </div>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="lista">
          <h2>Ubicaciones</h2>

          {points.map((point) => (
            <div
              key={point.id}
              className={`card ${
                selectedPoint === point.id ? "active" : ""
              }`}
              onClick={() => setSelectedPoint(point.id)}
            >
              <h3>{point.name}</h3>
              <p>📍 {point.address}</p>
              <p>🕒 {point.hours}</p>
              <p>📞 {point.phone}</p>

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${point.lat},${point.lng}`
                  )
                }
              >
                Cómo llegar
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PuntosRecoleccion;