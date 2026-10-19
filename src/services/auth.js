const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost";

// Convierte respuestas JSON de Laravel y señala explícitamente respuestas malformadas.
async function readJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("El servidor devolvió una respuesta que no es JSON.");
  }
}

// Obtiene un token CSRF de la sesión web antes de enviar solicitudes que modifican datos.
async function getCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/csrf-token`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  const data = await readJsonResponse(response);

  if (!response.ok || !data?.csrf_token) {
    throw new Error(data?.message || "No se pudo obtener el token de seguridad.");
  }

  return data.csrf_token;
}

// Envía una solicitud de sesión incluyendo cookies y el token CSRF requerido por Laravel.
async function sendSessionRequest(path, method, body) {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(body),
  });
  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || `La solicitud falló (HTTP ${response.status}).`);
  }

  return data;
}

// Consulta la sesión activa; 401 significa que todavía no hay un usuario autenticado.
export async function getCurrentUser({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    credentials: "include",
    headers: { Accept: "application/json" },
    signal,
  });
  const data = await readJsonResponse(response);

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `No se pudo consultar la sesión (HTTP ${response.status}).`);
  }

  return data;
}

// Recupera desde Laravel el perfil privado correspondiente a la sesión activa.
export async function getMyProfile({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/my-profile`, {
    credentials: "include",
    headers: { Accept: "application/json" },
    signal,
  });
  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || `No se pudo cargar el perfil (HTTP ${response.status}).`);
  }

  return data;
}

// Recupera únicamente los artículos y recompensas de la sesión autenticada.
export async function getMyCollection({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/my-collection`, {
    credentials: "include",
    headers: { Accept: "application/json" },
    signal,
  });
  const data = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || `No se pudo cargar tu colección (HTTP ${response.status}).`);
  }

  if (!Array.isArray(data?.inventory) || !Array.isArray(data?.rewards)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para tu colección.");
  }

  return data;
}

// Inicia la sesión web de Laravel con el correo y la contraseña del formulario.
export async function signIn(credentials) {
  const data = await sendSessionRequest("/login", "POST", credentials);
  return data.user;
}

// Solicita a Laravel invalidar la sesión actual.
export async function signOut() {
  await sendSessionRequest("/logout", "POST", {});
}
