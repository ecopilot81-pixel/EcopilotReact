import { useEffect, useState } from "react";
import { getMyCollection } from "../services/auth";

export default function MiColeccion() {
  const [coleccion, setColeccion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Consulta la colección privada al entrar y cancela la solicitud al salir de la página.
  useEffect(() => {
    const controller = new AbortController();

    getMyCollection({ signal: controller.signal })
      .then(setColeccion)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Presenta las fechas de reclamación con el formato local de Colombia.
  const formatDate = (date) => {
    if (!date) {
      return "Fecha no disponible";
    }

    return new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(date));
  };

  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Mi espacio</span>
        <h1>Mi colección</h1>
        <p>Consulta los artículos y recompensas obtenidos.</p>
      </header>

      {cargando && (
        <p role="status" className="visual-data-message">Cargando tu colección...</p>
      )}

      {error && (
        <p role="alert" className="visual-data-message visual-data-message--error">
          No se pudo cargar tu colección: {error}
        </p>
      )}

      {!cargando && !error && coleccion && (
        <>
          {/* Muestra los artículos y cantidades del inventario personal. */}
          <section className="visual-panel">
            <div className="visual-section-heading">
              <div>
                <h2>Inventario</h2>
                <p>Artículos asociados a tu cuenta.</p>
              </div>
              <span className="visual-tag">
                {coleccion.inventory.length} {coleccion.inventory.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>
            {coleccion.inventory.length > 0 ? (
              <div className="store-item-grid">
                {coleccion.inventory.map((item) => (
                  <article className="visual-panel store-item-card" key={item.id}>
                    <span className="store-item-card__icon" aria-hidden="true">🎒</span>
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                    <div className="store-item-card__details">
                      <strong>Cantidad</strong>
                      <span>{item.quantity}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="visual-empty-state visual-empty-state--compact">
                <span aria-hidden="true">🎒</span>
                <p>Aún no tienes artículos en tu inventario.</p>
              </div>
            )}
          </section>

          {/* Presenta las recompensas reclamadas y la fecha correspondiente. */}
          <section className="visual-panel">
            <div className="visual-section-heading">
              <div>
                <h2>Recompensas obtenidas</h2>
                <p>Reconocimientos reclamados en tus temporadas.</p>
              </div>
              <span className="visual-tag">
                {coleccion.rewards.length} {coleccion.rewards.length === 1 ? "recompensa" : "recompensas"}
              </span>
            </div>
            {coleccion.rewards.length > 0 ? (
              <div className="store-item-grid">
                {coleccion.rewards.map((reward) => (
                  <article className="visual-panel store-item-card" key={reward.id}>
                    <span className="store-item-card__icon" aria-hidden="true">🏅</span>
                    <h3>{reward.name || "Recompensa de temporada"}</h3>
                    {reward.description && <p>{reward.description}</p>}
                    {reward.season && <p>Temporada: {reward.season}</p>}
                    <div className="store-item-card__details">
                      <strong>Reclamada</strong>
                      <span>{formatDate(reward.claimedAt)}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="visual-empty-state visual-empty-state--compact">
                <span aria-hidden="true">🏅</span>
                <p>Aún no has reclamado recompensas.</p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
