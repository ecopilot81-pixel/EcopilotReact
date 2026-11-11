import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createApiData,
  deleteApiData,
  getApiData,
  updateApiData,
} from "../api/client";

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

const emptyForm = {
  nombre_lugar: "",
  direccion: "",
  latitud: "",
  longitud: "",
  telefono: "",
  horario_atencion: "",
  estado_punto: "activo",
  zona_id: "",
};

function calcularDistancia(origen, destino) {
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

export default function PuntosRecoleccion({ auth }) {
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const [buscandoCercano, setBuscandoCercano] = useState(false);
  const [puntos, setPuntos] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errorFormulario, setErrorFormulario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [puntoEditando, setPuntoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const ubicacionUsuario = routeLocation.state?.ubicacionUsuario ?? null;
  const errorUbicacion = routeLocation.state?.errorUbicacion ?? "";

  async function cargarDatos(signal) {
    const config = signal ? { signal } : undefined;
    const [puntosData, zonasData] = await Promise.all([
      getApiData("consultas/puntos-zona", config),
      getApiData("zonas", config),
    ]);

    if (!Array.isArray(puntosData) || !Array.isArray(zonasData)) {
      throw new Error("La respuesta del servidor no tiene el formato esperado.");
    }

    setPuntos(puntosData);
    setZonas(zonasData);
    setForm((actual) => ({
      ...actual,
      zona_id: actual.zona_id || String(zonasData[0]?.id || ""),
    }));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function cargarPuntos() {
      try {
        await cargarDatos(controller.signal);
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

  function buscarPuntoMasCercano() {
    if (!navigator.geolocation) {
      navigate(routeLocation.pathname, {
        replace: true,
        state: {
          ...routeLocation.state,
          errorUbicacion: "Tu navegador no permite consultar la ubicación actual.",
        },
      });
      return;
    }

    setBuscandoCercano(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        navigate(routeLocation.pathname, {
          replace: true,
          state: {
            ...routeLocation.state,
            ubicacionUsuario: { lat: coords.latitude, lng: coords.longitude },
            errorUbicacion: "",
          },
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
            ...routeLocation.state,
            errorUbicacion:
              mensajes[errorGeolocalizacion.code] || "No fue posible consultar tu ubicación.",
          },
        });
        setBuscandoCercano(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  const puntoMasCercano =
    ubicacionUsuario && puntosOficiales.length > 0
      ? puntosOficiales.reduce((masCercano, punto) =>
          calcularDistancia(ubicacionUsuario, punto.coordenadas) <
          calcularDistancia(ubicacionUsuario, masCercano.coordenadas)
            ? punto
            : masCercano,
        )
      : null;

  function editarPunto(punto) {
    setPuntoEditando(punto.id);
    setErrorFormulario("");
    setMensaje("");
    setForm({
      nombre_lugar: punto.nombre_lugar || "",
      direccion: punto.direccion || "",
      latitud: punto.latitud || "",
      longitud: punto.longitud || "",
      telefono: punto.telefono || "",
      horario_atencion: punto.horario_atencion || "",
      estado_punto: punto.estado_punto || "activo",
      zona_id: String(punto.zona_id || ""),
    });
  }

  function cancelarEdicion() {
    setPuntoEditando(null);
    setErrorFormulario("");
    setForm({ ...emptyForm, zona_id: String(zonas[0]?.id || "") });
  }

  async function guardarPunto(event) {
    event.preventDefault();
    setGuardando(true);
    setErrorFormulario("");
    setMensaje("");

    const datosPunto = {
      ...form,
      latitud: Number(form.latitud),
      longitud: Number(form.longitud),
      telefono: form.telefono || null,
      zona_id: Number(form.zona_id),
      administrador_id: auth?.user?.id,
    };

    try {
      if (puntoEditando) {
        await updateApiData("puntos", puntoEditando, datosPunto);
        setMensaje("Punto actualizado correctamente.");
      } else {
        await createApiData("puntos", datosPunto);
        setMensaje("Punto creado correctamente.");
      }

      cancelarEdicion();
      await cargarDatos();
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

  async function eliminarPunto(id) {
    if (!window.confirm("¿Seguro que deseas eliminar este punto?")) {
      return;
    }

    setEliminandoId(id);
    setErrorFormulario("");
    setMensaje("");

    try {
      await deleteApiData("puntos", id);
      setPuntos((actuales) => actuales.filter((punto) => punto.id !== id));
      setMensaje("Punto eliminado correctamente.");
      if (puntoEditando === id) {
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

        {auth?.user && (
          <section className="punto-form-section" aria-labelledby="punto-form-title">
            <h2 id="punto-form-title">
              {puntoEditando ? "Editar punto de recolección" : "Registrar punto de recolección"}
            </h2>
            <form className="punto-form" onSubmit={guardarPunto}>
              <label>
                Nombre del lugar
                <input
                  name="nombre_lugar"
                  value={form.nombre_lugar}
                  onChange={(event) => setForm({ ...form, nombre_lugar: event.target.value })}
                  maxLength="255"
                  required
                />
              </label>
              <label>
                Dirección
                <input
                  name="direccion"
                  value={form.direccion}
                  onChange={(event) => setForm({ ...form, direccion: event.target.value })}
                  maxLength="255"
                  required
                />
              </label>
              <label>
                Latitud
                <input
                  name="latitud"
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  value={form.latitud}
                  onChange={(event) => setForm({ ...form, latitud: event.target.value })}
                  required
                />
              </label>
              <label>
                Longitud
                <input
                  name="longitud"
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  value={form.longitud}
                  onChange={(event) => setForm({ ...form, longitud: event.target.value })}
                  required
                />
              </label>
              <label>
                Teléfono
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={(event) => setForm({ ...form, telefono: event.target.value })}
                  maxLength="20"
                />
              </label>
              <label>
                Horario de atención
                <input
                  name="horario_atencion"
                  value={form.horario_atencion}
                  onChange={(event) => setForm({ ...form, horario_atencion: event.target.value })}
                  maxLength="255"
                  required
                />
              </label>
              <label>
                Zona
                <select
                  name="zona_id"
                  value={form.zona_id}
                  onChange={(event) => setForm({ ...form, zona_id: event.target.value })}
                  required
                >
                  {zonas.map((zona) => (
                    <option key={zona.id} value={zona.id}>{zona.nombre}</option>
                  ))}
                </select>
              </label>
              <label>
                Estado
                <select
                  name="estado_punto"
                  value={form.estado_punto}
                  onChange={(event) => setForm({ ...form, estado_punto: event.target.value })}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </label>
              {errorFormulario && (
                <p role="alert" className="visual-data-message--error">
                  {errorFormulario}
                </p>
              )}
              {mensaje && <p role="status">{mensaje}</p>}
              <div className="punto-form__actions">
                <button type="submit" disabled={guardando || zonas.length === 0}>
                  {guardando ? "Guardando..." : puntoEditando ? "Guardar cambios" : "Crear punto"}
                </button>
                {puntoEditando && (
                  <button type="button" onClick={cancelarEdicion} disabled={guardando}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

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

        {error && (
          <p role="alert" className="visual-data-message visual-data-message--error">
            {error}
          </p>
        )}

        {!cargando && !error && puntos.length === 0 && (
          <p className="visual-data-message">
            No hay puntos de recolección registrados por el momento.
          </p>
        )}

        {!cargando && !error && puntos.length > 0 && (
          <section className="puntos-list">
            <h2>Puntos registrados</h2>
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
                {auth?.user && (
                  <div className="punto-form__actions">
                    <button type="button" onClick={() => editarPunto(punto)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarPunto(punto.id)}
                      disabled={eliminandoId === punto.id}
                    >
                      {eliminandoId === punto.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
