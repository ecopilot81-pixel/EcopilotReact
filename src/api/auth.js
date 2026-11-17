import axios from "axios";
import { API_BASE_URL } from "./client";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./accessToken";

const api = axios.create({
  baseURL: API_BASE_URL || "/v1",
  headers: { Accept: "application/json" },
});

// Envía el token Bearer de Sanctum en las solicitudes autenticadas.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// Si Laravel responde 401, no hay un token válido.
export async function getCurrentUser({ signal } = {}) {
  try {
    const { data } = await api.get("/me", { signal });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new DOMException(error.message, "AbortError");
    }

    if (error.response?.status === 401) {
      clearAccessToken();
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

// Envía los datos personales y la foto nueva con el token Bearer.
export async function saveMyProfile(profileData) {
  profileData.append("_method", "PUT");
  const { data } = await api.post("/my-profile", profileData);
  return data;
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

// Envía el mensaje autenticado con el token Bearer.
export async function sendChatMessage(question) {
  const { data } = await api.post(
    "/my-chat-history",
    { pregunta_usuario: question },
  );
  return data;
}

// Inicia sesión, guarda el token de Sanctum y devuelve el usuario autenticado.
export async function signIn(credentials) {
  const { data } = await api.post("/login", credentials);
  if (typeof data?.token !== "string" || !data.token || !data.user) {
    throw new Error("El servidor no devolvió un token de acceso válido.");
  }

  setAccessToken(data.token);
  return data.user;
}

// Revoca el token actual en Laravel y lo elimina del navegador.
export async function signOut() {
  if (!getAccessToken()) {
    return;
  }

  try {
    await api.post("/logout");
  } finally {
    clearAccessToken();
  }
}
