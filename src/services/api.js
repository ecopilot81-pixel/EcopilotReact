// Vite solo expone al navegador las variables de entorno que empiezan con VITE_.
const API_BASE_URL = import.meta.env.VITE_SERVER_API;

// Une la URL base y la ruta sin dejar barras duplicadas o faltantes.
export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar VITE_SERVER_API en el .env del frontend.");
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
