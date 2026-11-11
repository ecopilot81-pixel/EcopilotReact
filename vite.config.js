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
  "/storage",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const backendUrl =
    env.VITE_BACKEND_URL || env.VITE_API_BASE_URL || "http://api.ecopilot.test";

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
});
