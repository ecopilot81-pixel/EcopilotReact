<<<<<<< HEAD
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const backendPaths = [
  "/v1",
  "/csrf-token",
  "/login",
  "/logout",
  "/me",
  "/my-profile",
  "/my-collection",
  "/my-chat-history",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const backendUrl = env.VITE_BACKEND_URL || "http://api.ecopilot.test";
  const proxy = Object.fromEntries(
    backendPaths.map((path) => [
      path,
      {
        target: backendUrl,
        changeOrigin: true,
      },
    ]),
  );

  return {
    plugins: [react()],
    server: { proxy },
  };
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Evita CORS y permite que las cookies de sesión viajen desde el mismo origen.
const apiProxy = {
  target: "http://api.ecopilot.test",
  changeOrigin: true,
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Reenvía las rutas de datos versionadas y las rutas web de autenticación.
      "/v1": apiProxy,
      "/storage": apiProxy,
      "^/(csrf-token|login|logout|me|my-profile|my-collection|my-chat-history)(/|$)": apiProxy,
    },
  },
>>>>>>> 633aaae (Crud en Noticias (conocimiento) y Perfil, modificacion en el autenticacion y conexion a la Api para hacer las peticiones http)
});
