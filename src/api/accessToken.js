const ACCESS_TOKEN_KEY = "ecopilot_access_token";

// Mantiene el acceso solo durante la pestaña actual y se limpia al cerrarla.
export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
