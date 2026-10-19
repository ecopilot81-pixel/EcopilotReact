# React + Vite

## Mapa de puntos de recolección

La página muestra el mapa general de Popayán y una lista de ubicaciones obtenidas
desde la API de Laravel.

## Inicio de sesión local

El formulario de acceso utiliza sesiones web de Laravel y protección CSRF; no
guarda tokens de autenticación en el navegador. El frontend espera que Laravel
esté disponible en `http://localhost`. Para cambiar esa dirección, define
`VITE_API_BASE_URL` en el entorno de Vite.

Laravel expone `GET /csrf-token`, `POST /login`, `GET /me`,
`GET /my-profile`, `GET /my-collection` y `POST /logout`. El endpoint
`/my-profile` devuelve el perfil y sus estadísticas; `/my-collection` devuelve
los artículos y recompensas reclamados. Ambos responden únicamente con datos
del usuario autenticado.
Las rutas personales de Perfil y Mi colección solicitan una sesión activa.

El backend permite por defecto los orígenes locales de Vite en los puertos
5173 y 5174. Si utilizas otro origen, define `CORS_ALLOWED_ORIGINS` en el `.env`
de Laravel como una lista separada por comas y limpia la caché de configuración
de Laravel para aplicar el cambio.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
