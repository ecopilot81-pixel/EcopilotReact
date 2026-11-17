import axios from "axios";
import { getAccessToken } from "./accessToken";

// Las rutas API de Laravel usan el prefijo /v1 y pueden usar una URL completa.
const API_BASE_URL = import.meta.env.VITE_SERVER_API || "/v1";
export const API_ROOT_URL = API_BASE_URL.replace(/\/v1\/?$/, "");
export { API_BASE_URL };

const apiClient = axios.create({
  headers: { Accept: "application/json" },
});

// Adjunta el token Bearer de Sanctum cuando hay un usuario autenticado.
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

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
  const { data } = await apiClient.post(apiUrl(path), record, config);
  return data;
}

// Reemplaza un registro existente.
export async function updateApiData(path, id, record, config) {
  const url = apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`);

  if (record instanceof FormData) {
    // Laravel/PHP recibe archivos en POST; _method conserva la ruta PUT del CRUD.
    record.append("_method", "PUT");
    const { data } = await apiClient.post(url, record, config);
    return data;
  }

  const { data } = await apiClient.put(url, record, config);
  return data;
}

// Actualiza parcialmente un registro existente.
export async function patchApiData(path, id, changes, config) {
  const url = apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`);

  if (changes instanceof FormData) {
    changes.append("_method", "PATCH");
    const { data } = await apiClient.post(url, changes, config);
    return data;
  }

  const { data } = await apiClient.patch(url, changes, config);
  return data;
}

// Elimina un registro del recurso indicado.
export async function deleteApiData(path, id, config) {
  const { data } = await apiClient.delete(
    apiUrl(`${path.replace(/\/+$/, "")}/${encodeURIComponent(id)}`),
    config,
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

  const storagePath = path.startsWith("storage/")
    ? path
    : `storage/${path.replace(/^\/+/, "")}`;
  return new URL(`${API_ROOT_URL}/${storagePath}`, window.location.origin).toString();
}
