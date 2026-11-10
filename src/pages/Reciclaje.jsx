import { useEffect, useState } from "react";
import { getApiData } from "../api/client";

export default function Reciclaje({ embedded = false }) {
  const [materiales, setMateriales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarMateriales() {
      try {
        // GET del catálogo de materiales.
        const datos = await getApiData("tipos-materiales", {
          signal: controller.signal,
        });

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        setMateriales(datos);
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError(errorSolicitud.message || "No fue posible cargar los materiales.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarMateriales();
    return () => controller.abort();
  }, []);

  // El modo incrustado permite mostrar las actividades dentro del perfil.
  return (
    <div className={embedded ? "visual-page visual-page--embedded" : "visual-page"}>
      <header className="visual-page__header">
        <span className="visual-eyebrow">Participa</span>
        {embedded ? <h2>Mis actividades</h2> : <h1>Recicla tus materiales</h1>}
        <p>Conoce qué materiales puedes reciclar y cuántos puntos otorga cada uno.</p>
      </header>

      <section aria-labelledby="materiales-heading">
        <div className="visual-section-heading">
          <div>
            <h2 id="materiales-heading">Materiales reciclables</h2>
            <p>Prepara cada material siguiendo las indicaciones antes de entregarlo.</p>
          </div>
          {!cargando && !error && (
            <span className="visual-tag">{materiales.length} materiales</span>
          )}
        </div>

        {cargando && (
          <p role="status" className="visual-data-message">
            Cargando materiales reciclables...
          </p>
        )}

        {error && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            No se pudieron cargar los materiales: {error}
          </p>
        )}

        {!cargando && !error && materiales.length === 0 && (
          <p className="visual-data-message">No hay materiales disponibles por el momento.</p>
        )}

        {!cargando && !error && materiales.length > 0 && (
          <div className="visual-material-grid">
            {materiales.map((material) => (
              <article className="visual-panel visual-material-card" key={material.id}>
                <span className="visual-material-card__icon" aria-hidden="true">
                  ♻️
                </span>
                <h3>{material.nombre}</h3>
                <p className="visual-material-card__points">
                  {material.valor_puntos} puntos por {material.unidad_medidas.toLowerCase()}
                </p>
                {material.instrucciones && <p>{material.instrucciones}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
