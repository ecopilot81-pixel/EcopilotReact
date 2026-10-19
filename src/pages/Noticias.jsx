import { useEffect, useRef, useState } from "react";

export default function Noticias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Estado independiente para cargar y mostrar las noticias sin bloquear las categorías.
  const [noticias, setNoticias] = useState([]);
  const [cargandoNoticias, setCargandoNoticias] = useState(true);
  const [errorNoticias, setErrorNoticias] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const noticiasRef = useRef(null);

  // Al abrir Noticias, obtiene del backend las categorías disponibles.
  useEffect(() => {
    const controller = new AbortController();

    // Solicita la lista de categorías globales al API de Laravel.
    async function cargarCategorias() {
      try {
        const respuesta = await fetch(
          "http://localhost/v1/categorias-globales",
          { signal: controller.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();

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

  // Al abrir Noticias, también solicita las noticias publicadas con su categoría y autor.
  useEffect(() => {
    const controller = new AbortController();

    // Consulta la ruta del backend que incluye las relaciones de categoría y usuario.
    async function cargarNoticias() {
      try {
        const respuesta = await fetch(
          "http://localhost/v1/consultas/noticias",
          { signal: controller.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Muestra solo noticias publicadas para no presentar borradores en la página.
        setNoticias(datos.filter((noticia) => noticia.estado_noticia === "publicada"));
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
  }, []);

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
        <span className="visual-eyebrow">Novedades</span>
        <h1>Noticias ambientales</h1>
        <p>Información y novedades para una comunidad más sostenible.</p>
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
                <span className="visual-tag">
                  {noticia.categoria_global?.nombre || "General"}
                </span>
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
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
