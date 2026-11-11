import axios from "axios";

// Las rutas API de Laravel usan el prefijo /v1.
const API_BASE_URL = import.meta.env.VITE_SERVER_API || "/v1";

const apiClient = axios.create({
  headers: { Accept: "application/json" },
  withCredentials: true,
});

// Adjunta el token CSRF que Laravel exige para las operaciones de escritura.
async function getCsrfConfig(config) {
  const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
  const { data } = await apiClient.get(`${apiOrigin}/csrf-token`);
  if (!data?.csrf_token) {
    throw new Error("No se pudo obtener el token de seguridad.");
  }

  return {
    ...config,
    headers: {
      ...config?.headers,
      "X-CSRF-TOKEN": data.csrf_token,
    },
  };
}

// Une la URL base con la ruta solicitada.
export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar VITE_SERVER_API en el .env del frontend.");
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

// Consulta un endpoint GET y devuelve sus datos.
export async function getApiData(path, config) {
  try {
    const { data } = await apiClient.get(apiUrl(path), config);
    return data;
  } catch (error) {
    // Ignora cancelaciones hechas al salir de una página.
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    throw error;
  }
}

// Lee un registro usando la ruta del recurso y su identificador.
export async function getApiItem(path, id, config) {
  const { data } = await apiClient.get(
    apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`),
    config,
  );
  return data;
}

// Crea un registro en el recurso indicado.
export async function createApiData(path, record, config) {
  const requestConfig = await getCsrfConfig(config);
  const { data } = await apiClient.post(apiUrl(path), record, requestConfig);
  return data;
}

// Reemplaza un registro existente.
export async function updateApiData(path, id, record, config) {
  const url = apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`);
  const requestConfig = await getCsrfConfig(config);

  if (record instanceof FormData) {
    // Laravel/PHP recibe archivos en POST; _method conserva la ruta PUT del CRUD.
    record.append("_method", "PUT");
    const { data } = await apiClient.post(url, record, requestConfig);
    return data;
  }

  const { data } = await apiClient.put(url, record, requestConfig);
  return data;
}

// Actualiza parcialmente un registro existente.
export async function patchApiData(path, id, changes, config) {
  const url = apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`);
  const requestConfig = await getCsrfConfig(config);

  if (changes instanceof FormData) {
    changes.append("_method", "PATCH");
    const { data } = await apiClient.post(url, changes, requestConfig);
    return data;
  }

  const { data } = await apiClient.patch(url, changes, requestConfig);
  return data;
}

// Elimina un registro del recurso indicado.
export async function deleteApiData(path, id, config) {
  const requestConfig = await getCsrfConfig(config);
  const { data } = await apiClient.delete(
    apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`),
    requestConfig,
  );
  return data;
}

// Convierte una ruta de storage devuelta por Laravel en una URL accesible.
export function apiAssetUrl(path) {
  if (!path) {
    return "";
  }

  if (/^(https?:)?\/\//i.test(path)) {
    return path;
  }

  const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
  const storagePath = path.startsWith("storage/")
    ? path
    : `storage/${path.replace(/^\/+/, "")}`;
  return new URL(storagePath, `${apiOrigin}/`).toString();
}
