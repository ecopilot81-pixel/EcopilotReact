import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost";

// Cliente Axios compartido: envía las cookies de sesión y acepta respuestas JSON.
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

function getRequestErrorMessage(error, fallback) {
  return (
    error.response?.data?.message ||
    (error.response
      ? `${fallback} (HTTP ${error.response.status}).`
      : error.message || fallback)
  );
}

function createRequestError(error, fallback) {
  if (axios.isCancel(error)) {
    return new DOMException(error.message, "AbortError");
  }

  return new Error(getRequestErrorMessage(error, fallback), { cause: error });
}

async function requestData(request, fallback) {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    throw createRequestError(error, fallback);
  }
}

// Obtiene un token CSRF de la sesión web antes de enviar solicitudes que modifican datos.
async function getCsrfToken() {
  const data = await requestData(
    api.get("/csrf-token"),
    "No se pudo obtener el token de seguridad.",
  );

  if (!data?.csrf_token) {
    throw new Error(data?.message || "No se pudo obtener el token de seguridad.");
  }

  return data.csrf_token;
}

// Las operaciones de sesión usan POST y requieren el token CSRF de Laravel.
async function postSession(path, body) {
  const csrfToken = await getCsrfToken();
  return requestData(
    api.post(path, body, { headers: { "X-CSRF-TOKEN": csrfToken } }),
    "La solicitud falló",
  );
}

// Consulta la sesión activa; 401 significa que todavía no hay un usuario autenticado.
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

// Recupera desde Laravel el perfil privado correspondiente a la sesión activa.
export async function getMyProfile({ signal } = {}) {
  return requestData(
    api.get("/my-profile", { signal }),
    "No se pudo cargar el perfil",
  );
}

// Recupera únicamente los artículos y recompensas de la sesión autenticada.
export async function getMyCollection({ signal } = {}) {
  const data = await requestData(
    api.get("/my-collection", { signal }),
    "No se pudo cargar tu colección",
  );

  if (!Array.isArray(data?.inventory) || !Array.isArray(data?.rewards)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para tu colección.");
  }

  return data;
}

// Recupera el historial privado asociado a la sesión web activa.
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

// Envía una pregunta al backend y la guarda para el usuario autenticado.
export async function sendChatMessage(question) {
  return postSession("/my-chat-history", { pregunta_usuario: question });
}

// Inicia la sesión web de Laravel con el correo y la contraseña del formulario.
export async function signIn(credentials) {
  const data = await postSession("/login", credentials);
  return data.user;
}

// Solicita a Laravel invalidar la sesión actual.
export async function signOut() {
  await postSession("/logout", {});
}
