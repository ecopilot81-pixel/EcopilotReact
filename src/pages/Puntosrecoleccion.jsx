import { useEffect, useState } from "react";

const PuntosRecoleccion = () => {
  const [puntos, setPuntos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Al abrir la vista, carga los puntos junto con los datos de su zona.
  useEffect(() => {
    const controller = new AbortController();

    // Consulta al backend los puntos de recolección y sus zonas asociadas.
    async function cargarPuntos() {
      try {
        const respuesta = await fetch(
          "http://localhost/v1/consultas/puntos-zona",
          { signal: controller.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Guarda los registros recibidos para mostrarlos en la lista de ubicaciones.
        setPuntos(datos);
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError(errorSolicitud.message || "No fue posible cargar los puntos.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarPuntos();
    return () => controller.abort();
  }, []);

  return (
    <div className="puntos-container">
      <header className="puntos-header">
        <h1>Puntos de Recolección en Popayán</h1>
        <p>Consulta los puntos de reciclaje registrados y la zona donde se encuentran.</p>
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
          <div className="puntos-list-heading">
            <h2>Ubicaciones registradas</h2>
            {!cargando && !error && (
              <span className="visual-tag">{puntos.length} puntos</span>
            )}
          </div>

          {cargando && (
            <p role="status" className="visual-data-message">
              Cargando puntos de recolección...
            </p>
          )}

          {error && (
            <p role="alert" className="visual-data-message visual-data-message--error">
              No se pudieron cargar los puntos: {error}
            </p>
          )}

          {!cargando && !error && puntos.length === 0 && (
            <p className="visual-data-message">
              No hay puntos de recolección registrados por el momento.
            </p>
          )}

          {/* Muestra cada punto registrado con su dirección, zona, horario y estado. */}
          {!cargando && !error && puntos.length > 0 && (
            <div className="puntos-list">
              {puntos.map((punto) => (
                <article className="punto-card" key={punto.id}>
                  <div className="punto-card__heading">
                    <h3>{punto.nombre_lugar}</h3>
                    <span
                      className={`punto-card__status ${
                        punto.estado_punto === "activo" ? "is-active" : "is-inactive"
                      }`}
                    >
                      {punto.estado_punto || "Sin estado"}
                    </span>
                  </div>
                  <p><strong>Zona:</strong> {punto.zona?.nombre || "Sin zona asignada"}</p>
                  <p><strong>Dirección:</strong> {punto.direccion}</p>
                  <p><strong>Horario:</strong> {punto.horario_atencion}</p>
                  {punto.telefono && <p><strong>Teléfono:</strong> {punto.telefono}</p>}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PuntosRecoleccion;