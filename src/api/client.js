import axios from "axios";

// Las rutas API de Laravel usan el prefijo /v1.
const API_BASE_URL = import.meta.env.VITE_SERVER_API || "/v1";

const apiClient = axios.create({
  headers: { Accept: "application/json" },
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
