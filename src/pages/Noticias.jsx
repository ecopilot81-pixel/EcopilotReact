import { useEffect, useRef, useState } from "react";
import {
  apiAssetUrl,
  createApiData,
  deleteApiData,
  getApiData,
  updateApiData,
} from "../api/client";

const emptyForm = {
  titulo: "",
  resumen: "",
  contenido: "",
  fuente: "",
  url_fuente: "",
  estado_noticia: "publicada",
  categoria_global_id: "",
  imagen_destacada: null,
};

export default function Noticias({ auth }) {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Estado independiente para cargar y mostrar las noticias sin bloquear las categorías.
  const [noticias, setNoticias] = useState([]);
  const [cargandoNoticias, setCargandoNoticias] = useState(true);
  const [errorNoticias, setErrorNoticias] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const noticiasRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [noticiaEditando, setNoticiaEditando] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [mensajeFormulario, setMensajeFormulario] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const authUserId = auth?.user?.id;

  useEffect(() => {
    const controller = new AbortController();

    // GET de categorías globales.
    async function cargarCategorias() {
      try {
        const datos = await getApiData("categorias-globales", {
          signal: controller.signal,
        });

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Guarda las categorías recibidas para presentarlas en la vista.
        setCategorias(datos);
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError(errorSolicitud.message || "No fue posible cargar las categorías.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarCategorias();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // GET de noticias con sus categorías y autores.
    async function cargarNoticias() {
      try {
        const datos = await getApiData("consultas/noticias", {
          signal: controller.signal,
        });

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Muestra solo noticias publicadas para no presentar borradores en la página.
        setNoticias(datos.filter((noticia) =>
          authUserId || noticia.estado_noticia === "publicada"
        ));
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setErrorNoticias(errorSolicitud.message || "No fue posible cargar las noticias.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargandoNoticias(false);
        }
      }
    }

    cargarNoticias();
    return () => controller.abort();
  }, [authUserId]);

  function iniciarEdicion(noticia) {
    setNoticiaEditando(noticia.id);
    setErrorFormulario("");
    setMensajeFormulario("");
    setForm({
      titulo: noticia.titulo || "",
      resumen: noticia.resumen || "",
      contenido: noticia.contenido || "",
      fuente: noticia.fuente || "",
      url_fuente: noticia.url_fuente || "",
      estado_noticia: noticia.estado_noticia || "publicada",
      categoria_global_id: String(noticia.categoria_global_id || ""),
      imagen_destacada: null,
    });
    setFileInputKey((key) => key + 1);
  }

  function cancelarEdicion() {
    setNoticiaEditando(null);
    setErrorFormulario("");
    setForm({ ...emptyForm, categoria_global_id: String(categorias[0]?.id || "") });
    setFileInputKey((key) => key + 1);
  }

  async function guardarNoticia(event) {
    event.preventDefault();
    setGuardando(true);
    setErrorFormulario("");
    setMensajeFormulario("");

    const datos = new FormData();
    Object.entries(form).forEach(([campo, valor]) => {
      if (campo !== "imagen_destacada" && valor !== "") {
        datos.append(campo, valor);
      }
    });
    if (form.imagen_destacada) {
      datos.append("imagen_destacada", form.imagen_destacada);
    }

    try {
      // Envía el formulario como multipart para que Laravel reciba el archivo.
      if (noticiaEditando) {
        await updateApiData("noticias", noticiaEditando, datos);
        setMensajeFormulario("Noticia actualizada correctamente.");
      } else {
        await createApiData("noticias", datos);
        setMensajeFormulario("Noticia guardada correctamente.");
      }

      cancelarEdicion();
      const datosActualizados = await getApiData("consultas/noticias");
      setNoticias(datosActualizados.filter((noticia) =>
        authUserId || noticia.estado_noticia === "publicada"
      ));
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

  async function eliminarNoticia(id) {
    if (!window.confirm("¿Seguro que deseas eliminar esta noticia?")) {
      return;
    }

    setEliminandoId(id);
    setErrorFormulario("");
    setMensajeFormulario("");

    try {
      await deleteApiData("noticias", id);
      setNoticias((actuales) => actuales.filter((noticia) => noticia.id !== id));
      setMensajeFormulario("Noticia eliminada correctamente.");
      if (noticiaEditando === id) {
        cancelarEdicion();
      }
    } catch (requestError) {
      setErrorFormulario(
        requestError.response?.data?.message || requestError.message,
      );
    } finally {
      setEliminandoId(null);
    }
  }

  // Limita la lista mostrada a la categoría elegida; null representa "Todas".
  const noticiasFiltradas = categoriaSeleccionada === null
    ? noticias
    : noticias.filter((noticia) => noticia.categoria_global_id === categoriaSeleccionada);
  const nombreCategoriaSeleccionada = categorias.find(
    (categoria) => categoria.id === categoriaSeleccionada,
  )?.nombre;

  // Aplica el filtro seleccionado y lleva la vista hasta la lista de noticias.
  function seleccionarCategoria(idCategoria) {
    setCategoriaSeleccionada(idCategoria);
    noticiasRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Conocimiento</span>
        <h1>Noticias y publicaciones científicas</h1>
        <p>Información, novedades y publicaciones para una comunidad más sostenible.</p>
      </header>

      <section aria-labelledby="categorias-heading">
        <div className="visual-section-heading">
          <div>
            <h2 id="categorias-heading">Categorías</h2>
            <p>Selecciona una categoría para filtrar las noticias.</p>
          </div>
          {!cargando && !error && (
            <span className="visual-tag">{categorias.length} categorías</span>
          )}
        </div>

        {cargando && (
          <p role="status" className="visual-data-message">
            Cargando categorías...
          </p>
        )}

        {error && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            No se pudieron cargar las categorías: {error}
          </p>
        )}

        {!cargando && !error && categorias.length === 0 && (
          <p className="visual-data-message">No hay categorías disponibles por el momento.</p>
        )}

        {/* Cada botón filtra las noticias y muestra cuántas publicaciones tiene la categoría. */}
        {!cargando && !error && categorias.length > 0 && (
          <div className="visual-category-grid" aria-label="Filtrar noticias por categoría">
            <button
              className={`visual-panel visual-category-card visual-category-button ${
                categoriaSeleccionada === null ? "is-selected" : ""
              }`}
              type="button"
              aria-pressed={categoriaSeleccionada === null}
              onClick={() => seleccionarCategoria(null)}
            >
              <span aria-hidden="true">📰</span>
              <span className="visual-category-card__name">Todas</span>
              <span className="visual-category-card__count">{noticias.length} noticias</span>
            </button>
            {categorias.map((categoria) => {
              const cantidadNoticias = noticias.filter(
                (noticia) => noticia.categoria_global_id === categoria.id,
              ).length;

              return (
                <button
                  className={`visual-panel visual-category-card visual-category-button ${
                    categoriaSeleccionada === categoria.id ? "is-selected" : ""
                  }`}
                  key={categoria.id}
                  type="button"
                  aria-pressed={categoriaSeleccionada === categoria.id}
                  onClick={() => seleccionarCategoria(categoria.id)}
                >
                  <span aria-hidden="true">🏷️</span>
                  <span className="visual-category-card__name">{categoria.nombre}</span>
                  <span className="visual-category-card__count">
                    {cantidadNoticias} {cantidadNoticias === 1 ? "noticia" : "noticias"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {auth?.user && (
        <section className="visual-panel news-form-panel" aria-labelledby="news-form-title">
          <h2 id="news-form-title">
            {noticiaEditando ? "Editar noticia" : "Crear noticia"}
          </h2>
          <form className="news-form" onSubmit={guardarNoticia}>
            <label>
              Título
              <input
                name="titulo"
                value={form.titulo}
                onChange={(event) => setForm({ ...form, titulo: event.target.value })}
                maxLength="255"
                required
              />
            </label>
            <label>
              Resumen
              <textarea
                name="resumen"
                value={form.resumen}
                onChange={(event) => setForm({ ...form, resumen: event.target.value })}
                required
                rows="3"
              />
            </label>
            <label className="news-form__wide">
              Contenido
              <textarea
                name="contenido"
                value={form.contenido}
                onChange={(event) => setForm({ ...form, contenido: event.target.value })}
                required
                rows="6"
              />
            </label>
            <label>
              Categoría
              <select
                name="categoria_global_id"
                value={form.categoria_global_id}
                onChange={(event) => setForm({ ...form, categoria_global_id: event.target.value })}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </label>
            <label>
              Imagen destacada
              <input
                key={fileInputKey}
                name="imagen_destacada"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setForm({ ...form, imagen_destacada: event.target.files?.[0] || null })}
              />
              <small>JPG, PNG o WebP; máximo 5 MB.</small>
            </label>
            <label>
              Fuente
              <input
                name="fuente"
                value={form.fuente}
                onChange={(event) => setForm({ ...form, fuente: event.target.value })}
                maxLength="255"
              />
            </label>
            <label>
              URL de la fuente
              <input
                name="url_fuente"
                type="url"
                value={form.url_fuente}
                onChange={(event) => setForm({ ...form, url_fuente: event.target.value })}
                maxLength="255"
              />
            </label>
            <label>
              Estado
              <select
                name="estado_noticia"
                value={form.estado_noticia}
                onChange={(event) => setForm({ ...form, estado_noticia: event.target.value })}
              >
                <option value="publicada">Publicada</option>
                <option value="borrador">Borrador</option>
              </select>
            </label>
            {errorFormulario && (
              <p role="alert" className="visual-data-message--error news-form__wide">
                {errorFormulario}
              </p>
            )}
            {mensajeFormulario && (
              <p role="status" className="news-form__wide">{mensajeFormulario}</p>
            )}
            <div className="news-form__actions news-form__wide">
              <button type="submit" disabled={guardando || categorias.length === 0}>
                {guardando ? "Guardando..." : noticiaEditando ? "Guardar cambios" : "Publicar noticia"}
              </button>
              {noticiaEditando && (
                <button type="button" onClick={cancelarEdicion} disabled={guardando}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      <section ref={noticiasRef} aria-labelledby="noticias-heading" id="lista-noticias">
        <div className="visual-section-heading">
          <div>
            <h2 id="noticias-heading">
              {nombreCategoriaSeleccionada || "Últimas noticias"}
            </h2>
            <p>
              {nombreCategoriaSeleccionada
                ? `Noticias de la categoría ${nombreCategoriaSeleccionada}.`
                : "Publicaciones recientes de la comunidad EcoPilot."}
            </p>
          </div>
          {!cargandoNoticias && !errorNoticias && (
            <span className="visual-tag">{noticiasFiltradas.length} noticias</span>
          )}
        </div>

        {cargandoNoticias && (
          <p role="status" className="visual-data-message">
            Cargando noticias...
          </p>
        )}

        {errorNoticias && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            No se pudieron cargar las noticias: {errorNoticias}
          </p>
        )}

        {!cargandoNoticias && !errorNoticias && noticiasFiltradas.length === 0 && (
          <p className="visual-data-message">
            {categoriaSeleccionada === null
              ? "No hay noticias publicadas por el momento."
              : `Todavía no hay noticias publicadas en ${nombreCategoriaSeleccionada || "esta categoría"}.`}
          </p>
        )}

        {/* Presenta cada noticia publicada con la información recibida desde el backend. */}
        {!cargandoNoticias && !errorNoticias && noticiasFiltradas.length > 0 && (
          <div className="visual-news-grid">
            {noticiasFiltradas.map((noticia) => (
              <article className="visual-panel visual-news-card" key={noticia.id}>
                {noticia.imagen_destacada && (
                  <img
                    className="visual-news-card__image"
                    src={apiAssetUrl(noticia.imagen_destacada)}
                    alt=""
                    loading="lazy"
                  />
                )}
                <span className="visual-tag">
                  {noticia.categoria_global?.nombre || "General"}
                </span>
                {auth?.user && noticia.estado_noticia !== "publicada" && (
                  <span className="visual-tag">{noticia.estado_noticia}</span>
                )}
                <h3>{noticia.titulo}</h3>
                <p>{noticia.resumen}</p>
                <div className="visual-news-card__meta">
                  <span>Por {noticia.user?.name || "Equipo EcoPilot"}</span>
                  {noticia.created_at && (
                    <time dateTime={noticia.created_at}>
                      {new Date(noticia.created_at).toLocaleDateString("es-CO")}
                    </time>
                  )}
                </div>
                {noticia.fuente && (
                  noticia.url_fuente ? (
                    <a href={noticia.url_fuente} target="_blank" rel="noreferrer">
                      Fuente: {noticia.fuente}
                    </a>
                  ) : (
                    <span className="visual-news-card__source">Fuente: {noticia.fuente}</span>
                  )
                )}
                {auth?.user && (
                  <div className="news-form__actions">
                    <button type="button" onClick={() => iniciarEdicion(noticia)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarNoticia(noticia.id)}
                      disabled={eliminandoId === noticia.id}
                    >
                      {eliminandoId === noticia.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
