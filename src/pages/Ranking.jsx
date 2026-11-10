import { useEffect, useState } from "react";
import { getApiData } from "../api/client";

export default function Ranking({ embedded = false }) {
  const [rankings, setRankings] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    // GET del ranking semanal con los usuarios asociados.
    async function cargarRankings() {
      try {
        const datos = await getApiData("consultas/rankings", {
          signal: controller.signal,
        });

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Conserva solo participantes activos y ordena por posición semanal.
        setRankings(
          datos
            .filter((registro) => registro.user?.estado_usuario === "activo")
            .sort((a, b) => a.posicion - b.posicion),
        );
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError(errorSolicitud.message || "No fue posible cargar el ranking.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarRankings();
    return () => controller.abort();
  }, []);

  // El modo incrustado adapta el encabezado sin duplicar la página.
  return (
    <div className={embedded ? "visual-page visual-page--embedded" : "visual-page"}>
      <header className="visual-page__header">
        <span className="visual-eyebrow">Comunidad</span>
        {embedded ? <h2>Ranking semanal</h2> : <h1>Ranking semanal</h1>}
        <p>Reconocemos a quienes suman acciones positivas para el planeta.</p>
      </header>

      <section className="visual-panel visual-panel--narrow">
        <div className="visual-section-heading">
          <div>
            <h2>Esta semana</h2>
            <p>Clasificación de participantes por puntos</p>
          </div>
          {!cargando && !error && (
            <span className="visual-tag">{rankings.length} participantes</span>
          )}
        </div>

        {cargando && (
          <p role="status" className="visual-data-message">
            Cargando ranking...
          </p>
        )}

        {error && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            No se pudo cargar el ranking: {error}
          </p>
        )}

        {!cargando && !error && rankings.length === 0 && (
          <p className="visual-data-message">No hay participantes en el ranking por el momento.</p>
        )}

        {/* Muestra los participantes en el orden semanal devuelto por el backend. */}
        {!cargando && !error && rankings.length > 0 && (
          <ol className="ranking-list">
            {rankings.map((registro) => (
              <li className="ranking-card" key={registro.id}>
                <span className="ranking-card__position" aria-label={`Posición ${registro.posicion}`}>
                  {registro.posicion}
                </span>
                <div className="ranking-card__participant">
                  <strong>{registro.user?.name || "Usuario"}</strong>
                  <span>{registro.recompensa || "Participante EcoPilot"}</span>
                </div>
                <strong className="ranking-card__points">
                  {registro.puntos_semanales} puntos
                </strong>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
