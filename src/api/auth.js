import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: { Accept: "application/json" },
});

// Si Laravel responde 401, no hay una sesión iniciada.
export async function getCurrentUser({ signal } = {}) {
  try {
    const { data } = await api.get("/me", { signal });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    if (error.response?.status === 401) {
      return null;
    }

    throw error;
  }
}

// Obtiene los datos privados del perfil de la sesión actual.
export async function getMyProfile({ signal } = {}) {
  try {
    const { data } = await api.get("/my-profile", { signal });
    return data;
  } catch (error) {
    // Permite que la vista distinga una cancelación de un fallo de la API.
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    throw error;
  }
}

// Comprueba que la respuesta contenga inventario y recompensas.
export async function getMyCollection({ signal } = {}) {
  let data;
  try {
    ({ data } = await api.get("/my-collection", { signal }));
  } catch (error) {
    // Permite que la vista ignore la petición si se desmontó.
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    throw error;
  }

  if (!Array.isArray(data?.inventory) || !Array.isArray(data?.rewards)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para tu colección.");
  }

  return data;
}

// Obtiene y valida la lista de mensajes guardados.
export async function getMyChatHistory({ signal } = {}) {
  let data;
  try {
    ({ data } = await api.get("/my-chat-history", { signal }));
  } catch (error) {
    // Permite que la vista ignore la petición si se desmontó.
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    throw error;
  }

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del servidor no tiene el formato esperado para el historial.");
  }

  return data;
}

// Laravel exige un token CSRF antes de guardar el mensaje.
export async function sendChatMessage(question) {
  const { data: csrfData } = await api.get("/csrf-token");
  if (!csrfData?.csrf_token) {
    throw new Error("No se pudo obtener el token de seguridad.");
  }

  const { data } = await api.post(
    "/my-chat-history",
    { pregunta_usuario: question },
    { headers: { "X-CSRF-TOKEN": csrfData.csrf_token } },
  );
  return data;
}

// Inicia sesión y devuelve el usuario autenticado.
export async function signIn(credentials) {
  const { data: csrfData } = await api.get("/csrf-token");
  if (!csrfData?.csrf_token) {
    throw new Error("No se pudo obtener el token de seguridad.");
  }

  const { data } = await api.post("/login", credentials, {
    headers: { "X-CSRF-TOKEN": csrfData.csrf_token },
  });
  return data.user;
}

// Cierra la sesión actual enviando el token CSRF.
export async function signOut() {
  const { data: csrfData } = await api.get("/csrf-token");
  if (!csrfData?.csrf_token) {
    throw new Error("No se pudo obtener el token de seguridad.");
  }

  await api.post("/logout", {}, {
    headers: { "X-CSRF-TOKEN": csrfData.csrf_token },
  });
}
