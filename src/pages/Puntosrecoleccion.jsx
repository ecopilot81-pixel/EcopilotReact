import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const puntosOficiales = [
  {
    id: "aremarpo",
    nombre: "AREMARPO",
    descripcion: "Asociación de Recolectores de Materiales Reciclables de Popayán.",
    direccion: "Carrera 4B Este # 11B-16, Popayán, Cauca",
    horario: "Lunes a viernes: 8:00 a. m. a 12:00 p. m. y 2:00 p. m. a 5:30 p. m.",
    sitio: "https://www.aremarpo.co/",
    coordenadas: { lat: 2.4325386, lng: -76.6002859 },
  },
  {
    id: "asocampo",
    nombre: "ASOCAMPO",
    descripcion: "Asociación Ambientalista de Popayán · Centro de Acopio.",
    direccion: "Kilómetro 3, Bodega B1, Lote E Especial B, Río Blanco, Popayán, Cauca",
    horario: "Lunes a sábado: 8:00 a. m. a 5:00 p. m.",
    sitio: "https://asocampoa.wixsite.com/asocampo",
    paginaSocial: {
      etiqueta: "Facebook",
      url: "https://www.facebook.com/asocampo.ambiental/",
    },
    telefonos: [
      { etiqueta: "WhatsApp", numero: "+57 320 613 2786", enlace: "573206132786" },
      { etiqueta: "Celular alternativo", numero: "314 649 7297", enlace: "573146497297" },
      { etiqueta: "Línea fija", numero: "(602) 837 6287", enlace: "6028376287" },
    ],
    correo: "asocampo@hotmail.es",
    coordenadas: { lat: 2.506173, lng: -76.5497833 },
  },
  {
    id: "eco-campanario",
    nombre: "ECO Campanario",
    descripcion: "Punto de recepción ubicado en el Centro Comercial Campanario.",
    direccion: "Carrera 9 # 24AN-21, Comuna 1, Popayán, Cauca",
    sitio: "https://campanariopopayan.com/",
    coordenadas: { lat: 2.4592813, lng: -76.5950452 },
  },
];

function calcularDistancia(origen, destino) {
  // La distancia en línea recta permite comparar puntos sin solicitar una ruta externa.
  const gradosARadianes = (grados) => (grados * Math.PI) / 180;
  const radioTierraKm = 6371;
  const diferenciaLatitud = gradosARadianes(destino.lat - origen.lat);
  const diferenciaLongitud = gradosARadianes(destino.lng - origen.lng);
  const latitudOrigen = gradosARadianes(origen.lat);
  const latitudDestino = gradosARadianes(destino.lat);
  const a =
    Math.sin(diferenciaLatitud / 2) ** 2 +
    Math.cos(latitudOrigen) *
      Math.cos(latitudDestino) *
      Math.sin(diferenciaLongitud / 2) ** 2;
  const fraccionDistancia = Math.min(1, Math.max(0, a));

  return (
    2 *
    radioTierraKm *
    Math.atan2(Math.sqrt(fraccionDistancia), Math.sqrt(1 - fraccionDistancia))
  );
}

function crearEnlaceRuta(punto, origen) {
  // Google Maps calcula la ruta real al abrir el enlace.
  const parametros = new URLSearchParams({
    api: "1",
    destination: `${punto.nombre}, ${punto.direccion}`,
    travelmode: "driving",
  });

  if (origen) {
    parametros.set("origin", `${origen.lat},${origen.lng}`);
  }

  return `https://www.google.com/maps/dir/?${parametros.toString()}`;
}

const PuntosRecoleccion = () => {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const [buscandoCercano, setBuscandoCercano] = useState(false);
  const ubicacionUsuario = routeLocation.state?.ubicacionUsuario ?? null;
  const errorUbicacion = routeLocation.state?.errorUbicacion ?? "";

  function buscarPuntoMasCercano() {
    if (!navigator.geolocation) {
      navigate(routeLocation.pathname, {
        replace: true,
        state: { errorUbicacion: "Tu navegador no permite consultar la ubicación actual." },
      });
      return;
    }

    setBuscandoCercano(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        navigate(routeLocation.pathname, {
          replace: true,
          state: { ubicacionUsuario: { lat: coords.latitude, lng: coords.longitude } },
        });
        setBuscandoCercano(false);
      },
      (errorGeolocalizacion) => {
        const mensajes = {
          1: "Permite el acceso a tu ubicación para encontrar el punto más cercano.",
          2: "No fue posible determinar tu ubicación. Inténtalo de nuevo.",
          3: "La consulta de ubicación tardó demasiado. Inténtalo de nuevo.",
        };
        navigate(routeLocation.pathname, {
          replace: true,
          state: {
            errorUbicacion:
              mensajes[errorGeolocalizacion.code] || "No fue posible consultar tu ubicación.",
          },
        });
        setBuscandoCercano(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  // Solo se calcula si hay ubicación; los datos de ubicación llegan desde el menú o este botón.
  const puntoMasCercano = ubicacionUsuario
    ? puntosOficiales.reduce((masCercano, punto) =>
        calcularDistancia(ubicacionUsuario, punto.coordenadas) <
        calcularDistancia(ubicacionUsuario, masCercano.coordenadas)
          ? punto
          : masCercano,
      )
    : null;

  return (
    <div className="puntos-container">
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Encuentra puntos oficiales para llevar materiales reciclables.</p>
      </header>

      <div className="puntos-content-layout">
        <section className="mapa-section">
          <h2>Mapa de Popayán</h2>
          <div className="mapa-box">
            <iframe
              className="google-map"
              title="Mapa de puntos de reciclaje en Popayán"
              src="https://maps.google.com/maps?q=Popay%C3%A1n%2C%20Colombia&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <section className="ubicaciones-section">
          <div className="puntos-list-heading">
            <h2>Puntos oficiales</h2>
            <span className="visual-tag">{puntosOficiales.length} puntos</span>
          </div>
          <p className="puntos-location-help">
            Comparte tu ubicación solo al solicitarlo para encontrar el punto más cercano.
            La distancia se estima en línea recta con coordenadas aproximadas; Google Maps
            calcula la ruta. Coordenadas: © colaboradores de OpenStreetMap.
          </p>
          <button
            type="button"
            className="puntos-nearest-button"
            onClick={buscarPuntoMasCercano}
            disabled={buscandoCercano}
          >
            {buscandoCercano ? "Buscando tu ubicación..." : "Encontrar el punto más cercano"}
          </button>

          {errorUbicacion && (
            <p role="alert" className="visual-data-message visual-data-message--error">
              {errorUbicacion}
            </p>
          )}

          {puntoMasCercano && (
            <div className="punto-nearest-result" role="status">
              <p>
                El punto más cercano según tu ubicación es <strong>{puntoMasCercano.nombre}</strong>.
              </p>
              <a
                className="punto-card__link"
                href={crearEnlaceRuta(puntoMasCercano, ubicacionUsuario)}
                target="_blank"
                rel="noreferrer"
              >
                Ver ruta en Google Maps
              </a>
            </div>
          )}

          <div className="puntos-list">
            {puntosOficiales.map((punto) => (
              <article className="punto-card" key={punto.id}>
                <div className="punto-card__heading">
                  <h3>{punto.nombre}</h3>
                </div>
                <p>{punto.descripcion}</p>
                <p><strong>Dirección:</strong> {punto.direccion}</p>
                {punto.horario && <p><strong>Horario:</strong> {punto.horario}</p>}
                {punto.telefonos?.map((telefono) => (
                  <p key={telefono.etiqueta}>
                    <strong>{telefono.etiqueta}:</strong>{" "}
                    <a href={`tel:${telefono.enlace}`}>{telefono.numero}</a>
                  </p>
                ))}
                {punto.correo && (
                  <p>
                    <strong>Correo:</strong> <a href={`mailto:${punto.correo}`}>{punto.correo}</a>
                  </p>
                )}
                <div className="punto-card__actions">
                  <a
                    className="punto-card__link"
                    href={punto.sitio}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sitio oficial
                  </a>
                  {punto.paginaSocial && (
                    <a
                      className="punto-card__link punto-card__link--secondary"
                      href={punto.paginaSocial.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {punto.paginaSocial.etiqueta}
                    </a>
                  )}
                  <a
                    className="punto-card__link punto-card__link--secondary"
                    href={crearEnlaceRuta(punto, ubicacionUsuario)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ruta en Maps
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PuntosRecoleccion;
