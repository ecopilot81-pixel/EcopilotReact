import { useEffect, useState } from "react";
import { getCurrentUser, signIn, signOut } from "../services/auth";
import { AuthContext } from "./authContext";

// Comparte la sesión actual y sus acciones con las pantallas del frontend.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Recupera la sesión existente al iniciar la aplicación.
  useEffect(() => {
    const controller = new AbortController();

    getCurrentUser({ signal: controller.signal })
      .then(setUser)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Mantiene en memoria al usuario devuelto por el inicio de sesión.
  async function login(credentials) {
    const authenticatedUser = await signIn(credentials);
    setUser(authenticatedUser);
    setError("");
    return authenticatedUser;
  }

  // Limpia el usuario local cuando Laravel confirma el cierre de sesión.
  async function logout() {
    await signOut();
    setUser(null);
    setError("");
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
