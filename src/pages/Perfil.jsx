import { useEffect, useState } from "react";
import { getMyProfile } from "../services/auth";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Carga la información privada correspondiente a la sesión activa.
  useEffect(() => {
    const controller = new AbortController();

    getMyProfile({ signal: controller.signal })
      .then(setPerfil)
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

  const nombreCompleto = perfil?.profile
    ? `${perfil.profile.nombre} ${perfil.profile.apellido}`.trim()
    : perfil?.user.name;

  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Mi espacio</span>
        <h1>Mi perfil</h1>
        <p>Consulta la información asociada a tu cuenta.</p>
      </header>

      {cargando && (
        <p role="status" className="visual-data-message">Cargando tu perfil...</p>
      )}

      {error && (
        <p role="alert" className="visual-data-message visual-data-message--error">
          No se pudo cargar tu perfil: {error}
        </p>
      )}

      {!cargando && !error && perfil && (
        <>
          {/* Presenta los datos del perfil devueltos para esta cuenta autenticada. */}
          <section className="visual-profile-card">
            <div className="visual-avatar" aria-hidden="true">🌎</div>
            <div className="visual-profile-info">
              <span className="visual-tag">Perfil</span>
              <h2>{nombreCompleto}</h2>
              {perfil.profile ? (
                <>
                  <p>{perfil.profile.alias || perfil.user.name}</p>
                  <p>{perfil.profile.ciudad || "Ciudad no registrada"}</p>
                  <p>{perfil.profile.biografia || "Sin biografía registrada."}</p>
                </>
              ) : (
                <p role="status">No se encontró un perfil personal para esta cuenta.</p>
              )}
              <p>{perfil.user.email}</p>
            </div>
          </section>

          {/* Resume las métricas relacionadas exclusivamente con esta cuenta. */}
          <section className="visual-stat-grid" aria-label="Resumen del perfil">
            <article className="visual-stat-card">
              <span aria-hidden="true">♻️</span>
              <strong>{perfil.user.puntos_totales}</strong>
              <small>Puntos acumulados</small>
            </article>
            <article className="visual-stat-card">
              <span aria-hidden="true">🌱</span>
              <strong>{perfil.stats.recyclingRecords}</strong>
              <small>Registros de reciclaje</small>
            </article>
            <article className="visual-stat-card">
              <span aria-hidden="true">🏆</span>
              <strong>{perfil.stats.claimedRewards}</strong>
              <small>Recompensas reclamadas</small>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
