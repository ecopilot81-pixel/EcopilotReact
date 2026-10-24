import { useEffect, useState } from "react";
import { apiUrl } from "../services/api";

export default function Tienda() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Al abrir la tienda, carga las categorías junto con los artículos asociados.
  useEffect(() => {
    const controller = new AbortController();

    // Consulta el endpoint que devuelve las categorías de tienda y sus artículos.
    async function cargarTienda() {
      try {
        const respuesta = await fetch(
          apiUrl("consultas/categorias-tienda-items"),
          { signal: controller.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Guarda las categorías y sus artículos para mostrarlos en la tienda.
        setCategorias(datos);
      } catch (errorSolicitud) {
        if (errorSolicitud.name !== "AbortError") {
          setError(errorSolicitud.message || "No fue posible cargar la tienda.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarTienda();
    return () => controller.abort();
  }, []);

  const cantidadArticulos = categorias.reduce(
    (total, categoria) => total + (Array.isArray(categoria.tienda_items) ? categoria.tienda_items.length : 0),
    0,
  );

  return (
    <div className="visual-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Recompensas</span>
        <h1>Tienda Eco-Pilot</h1>
        <p>Explora los artículos y beneficios disponibles para la comunidad.</p>
      </header>

      <section aria-labelledby="tienda-categorias-heading">
        <div className="visual-section-heading">
          <div>
            <h2 id="tienda-categorias-heading">Categorías y artículos</h2>
            <p>Consulta los beneficios, el costo y las unidades disponibles.</p>
          </div>
          {!cargando && !error && (
            <span className="visual-tag">
              {cantidadArticulos} {cantidadArticulos === 1 ? "artículo" : "artículos"}
            </span>
          )}
        </div>

        {cargando && (
          <p role="status" className="visual-data-message">
            Cargando artículos de la tienda...
          </p>
        )}

        {error && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            No se pudo cargar la tienda: {error}
          </p>
        )}

        {!cargando && !error && categorias.length === 0 && (
          <p className="visual-data-message">No hay categorías disponibles por el momento.</p>
        )}

        {/* Agrupa los artículos debajo de la categoría recibida desde el backend. */}
        {!cargando && !error && categorias.length > 0 && (
          <div className="store-category-list">
            {categorias.map((categoria) => (
              <section className="store-category" key={categoria.id}>
                <div className="visual-section-heading">
                  <div>
                    <h3>{categoria.nombre}</h3>
                    {categoria.descripcion && <p>{categoria.descripcion}</p>}
                  </div>
                </div>

                {Array.isArray(categoria.tienda_items) && categoria.tienda_items.length > 0 ? (
                  <div className="store-item-grid">
                    {categoria.tienda_items.map((articulo) => (
                      <article className="visual-panel store-item-card" key={articulo.id}>
                        <span className="store-item-card__icon" aria-hidden="true">🛍️</span>
                        <h4>{articulo.nombre_item}</h4>
                        {articulo.descripcion_beneficio && <p>{articulo.descripcion_beneficio}</p>}
                        <div className="store-item-card__details">
                          <strong>{articulo.costo_moneda_virtual} monedas</strong>
                          <span>
                            {articulo.stock > 0
                              ? `${articulo.stock} disponibles`
                              : "Agotado"}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="visual-data-message">
                    No hay artículos disponibles en esta categoría.
                  </p>
                )}
              </section>
            ))}
          </div>
        )}
      </section>
      <p className="visual-footnote">Los canjes se habilitarán en una fase posterior.</p>
    </div>
  );
}
