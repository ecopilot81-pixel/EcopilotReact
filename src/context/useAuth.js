import { useContext } from "react";
import { AuthContext } from "./authContext";

// Acceso tipado por contexto a los datos y acciones de autenticación.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }

  return context;
}
