import axios from "axios";

// Las rutas de sesión viven en la raíz (no bajo /v1) y deben usar el mismo
// protocolo y host local que la API para enviar correctamente las cookies.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost";

// Cliente compartido para solicitudes de sesión con cookies de Laravel.
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

function createRequestError(error, fallback) {
  // Mantiene las cancelaciones identificables para que las vistas puedan ignorarlas.
  if (axios.isCancel(error)) {
    return new DOMException(error.message, "AbortError");
  }

  // Prioriza el mensaje del backend y, si no existe, informa el estado HTTP o el error de red.
  const message =
    error.response?.data?.message ||
    (error.response
      ? `${fallback} (HTTP ${error.response.status}).`
      : error.message || fallback);
  return new Error(message, { cause: error });
}

async function requestData(request, fallback) {
  try {
    // Axios envuelve la respuesta HTTP; la aplicación solo necesita el contenido JSON.
    const { data } = await request;
    return data;
  } catch (error) {
    throw createRequestError(error, fallback);
  }
}

// Obtiene el token CSRF necesario para iniciar o cerrar una sesión de Laravel.
async function getCsrfToken() {
  // Laravel usa este token para validar las solicitudes que modifican la sesión.
  const data = await requestData(
    api.get("/csrf-token"),
    "No se pudo obtener el token de seguridad.",
  );

  if (!data?.csrf_token) {
    throw new Error(data?.message || "No se pudo obtener el token de seguridad.");
  }

  return data.csrf_token;
}

async function postSession(path, body) {
  // Envía primero el token CSRF y luego los datos de la operación de sesión.
  const csrfToken = await getCsrfToken();
  return requestData(
    api.post(path, body, { headers: { "X-CSRF-TOKEN": csrfToken } }),
    "La solicitud falló",
  );
}

// Devuelve null cuando no existe una sesión iniciada.
export async function getCurrentUser({ signal } = {}) {
  try {
    return await requestData(
      api.get("/me", { signal }),
      "No se pudo consultar la sesión",
    );
  } catch (error) {
    if (error.cause?.response?.status === 401) {
      return null;
    }

    throw error;
  }
}

// Obtiene el perfil privado; signal permite cancelar la petición al salir de la vista.
export async function getMyProfile({ signal } = {}) {
  return requestData(
    api.get("/my-profile", { signal }),
    "No se pudo cargar el perfil",
  );
}

export async function getMyCollection({ signal } = {}) {
  // La respuesta debe contener ambas listas antes de que la vista las consuma.
  const data = await requestData(
    api.get("/my-collection", { signal }),
    "No se pudo cargar tu colección",
  );

  if (!Array.isArray(data?.inventory) || !Array.isArray(data?.rewards)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para tu colección.");
  }

  return data;
}

// Recupera el historial de chat de la sesión y verifica que el servidor devuelva una lista.
export async function getMyChatHistory({ signal } = {}) {
  const data = await requestData(
    api.get("/my-chat-history", { signal }),
    "No se pudo cargar el historial",
  );

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para el historial.");
  }

  return data;
}

// Guarda la pregunta del usuario en el endpoint de historial del chatbot.
export async function sendChatMessage(question) {
  return postSession("/my-chat-history", { pregunta_usuario: question });
}

// Inicia sesión y entrega al contexto de React solo el usuario autenticado.
export async function signIn(credentials) {
  const data = await postSession("/login", credentials);
  return data.user;
}

// Cierra la sesión actual en Laravel; las cookies se envían mediante el cliente Axios.
export async function signOut() {
  await postSession("/logout", {});
}
