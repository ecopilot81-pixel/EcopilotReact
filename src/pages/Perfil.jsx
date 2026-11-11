import { useEffect, useState } from "react";
import { getMyProfile, saveMyProfile } from "../api/auth";
import { apiAssetUrl } from "../api/client";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    alias: "",
    telefono: "",
    ciudad: "",
    biografia: "",
    foto_perfil: null,
  });
  const [guardando, setGuardando] = useState(false);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [mensajeFormulario, setMensajeFormulario] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [fotoNoDisponible, setFotoNoDisponible] = useState(false);

  // GET del perfil asociado a la sesión.
  useEffect(() => {
    const controller = new AbortController();

    getMyProfile({ signal: controller.signal })
      .then((datos) => {
        setPerfil(datos);
        const partesNombre = (datos.profile?.nombre || datos.user.name).split(/\s+/);
        setForm({
          nombre: datos.profile?.nombre || partesNombre.shift() || "",
          apellido: datos.profile?.apellido || partesNombre.join(" "),
          alias: datos.profile?.alias || "",
          telefono: datos.profile?.telefono || "",
          ciudad: datos.profile?.ciudad || "",
          biografia: datos.profile?.biografia || "",
          foto_perfil: null,
        });
      })
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

  function actualizarCampo(event) {
    const { name, value, files } = event.target;
    setForm((actual) => ({
      ...actual,
      [name]: name === "foto_perfil" ? files?.[0] || null : value,
    }));
  }

  async function guardarPerfil(event) {
    event.preventDefault();
    setGuardando(true);
    setErrorFormulario("");
    setMensajeFormulario("");

    const datos = new FormData();
    Object.entries(form).forEach(([campo, valor]) => {
      if (campo !== "foto_perfil") {
        datos.append(campo, valor);
      }
    });
    if (form.foto_perfil) {
      datos.append("foto_perfil", form.foto_perfil);
    }

    try {
      const datosActualizados = await saveMyProfile(datos);
      setPerfil(datosActualizados);
      setFotoNoDisponible(false);
      setForm((actual) => ({ ...actual, foto_perfil: null }));
      setFileInputKey((key) => key + 1);
      setMensajeFormulario("Perfil actualizado correctamente.");
    } catch (requestError) {
      const errores = requestError.response?.data?.errors;
      setErrorFormulario(
        Object.values(errores || {}).flat()[0] ||
          requestError.response?.data?.message ||
          requestError.message,
      );
    } finally {
      setGuardando(false);
    }
  }

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
            {perfil.profile?.foto_perfil && !fotoNoDisponible ? (
              <img
                className="visual-avatar visual-avatar--image"
                src={apiAssetUrl(perfil.profile.foto_perfil)}
                alt={`Foto de ${nombreCompleto}`}
                onError={() => setFotoNoDisponible(true)}
              />
            ) : (
              <div className="visual-avatar" aria-hidden="true">🌎</div>
            )}
            <div className="visual-profile-info">
              <span className="visual-tag">Perfil</span>
              <h2>{nombreCompleto}</h2>
              {perfil.profile ? (
                <>
                  <p>{perfil.profile.alias || perfil.user.name}</p>
                  <p>{perfil.profile.ciudad || "Ciudad no registrada"}</p>
                  <p>{perfil.profile.biografia || "Sin biografía registrada."}</p>
                </>
              ) : <p>Aún no has completado tu perfil personal.</p>}
              <p>{perfil.user.email}</p>
            </div>
          </section>

          {/* Permite crear o editar únicamente los datos del perfil de la sesión. */}
          <section className="visual-panel profile-form-panel" aria-labelledby="profile-form-title">
            <h2 id="profile-form-title">
              {perfil.profile ? "Editar mi perfil" : "Completar mi perfil"}
            </h2>
            <form className="profile-form" onSubmit={guardarPerfil}>
              <label>
                Nombre
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={actualizarCampo}
                  maxLength="50"
                  required
                />
              </label>
              <label>
                Apellido
                <input
                  name="apellido"
                  value={form.apellido}
                  onChange={actualizarCampo}
                  maxLength="50"
                  required
                />
              </label>
              <label>
                Alias
                <input
                  name="alias"
                  value={form.alias}
                  onChange={actualizarCampo}
                  maxLength="50"
                  required
                />
              </label>
              <label>
                Teléfono
                <input
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={actualizarCampo}
                  maxLength="20"
                />
              </label>
              <label>
                Ciudad
                <input
                  name="ciudad"
                  value={form.ciudad}
                  onChange={actualizarCampo}
                  maxLength="100"
                />
              </label>
              <label className="profile-form__wide">
                Biografía
                <textarea
                  name="biografia"
                  value={form.biografia}
                  onChange={actualizarCampo}
                  maxLength="255"
                  rows="4"
                />
              </label>
              <label className="profile-form__wide">
                Foto de perfil
                <input
                  key={fileInputKey}
                  name="foto_perfil"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={actualizarCampo}
                />
                <small>JPG, PNG o WebP; máximo 5 MB.</small>
              </label>
              {errorFormulario && (
                <p role="alert" className="visual-data-message--error profile-form__wide">
                  {errorFormulario}
                </p>
              )}
              {mensajeFormulario && (
                <p role="status" className="profile-form__wide">{mensajeFormulario}</p>
              )}
              <div className="profile-form__wide profile-form__actions">
                <button type="submit" disabled={guardando}>
                  {guardando ? "Guardando..." : "Guardar perfil"}
                </button>
              </div>
            </form>
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

      {/* Reutiliza los módulos completos para conservar sus consultas y estados de carga. */}
      <section className="profile-module" aria-label="Ranking semanal">
        <Ranking embedded />
      </section>

      <section className="profile-module" aria-label="Mis actividades de reciclaje">
        <Reciclaje embedded />
      </section>
    </div>
  );
}
