import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, signIn, signOut } from "./api/auth";
import MainLayout from "./layouts/Main";
import Home from "./pages/Home";
import PuntosRecoleccion from "./pages/Puntosrecoleccion";
import Emprendimientos from "./pages/Emprendimientos";
import Manualidades from "./pages/Manualidades";
import Noticias from "./pages/Noticias";
import Reciclaje from "./pages/Reciclaje";
import Ranking from "./pages/Ranking";
import Perfil from "./pages/Perfil";
import Tienda from "./pages/Tienda";
import MiColeccion from "./pages/MiColeccion";
import Chatbot from "./pages/Chatbot";
import Conocimiento from "./pages/Conocimiento";
import Investigacion from "./pages/Investigacion";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import CompletarRegistro from "./pages/CompletarRegistro";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Consulta la sesión existente al iniciar la aplicación.
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

  // Actualiza el usuario local después de autenticarlo con Laravel.
  async function login(credentials) {
    const authenticatedUser = await signIn(credentials);
    setUser(authenticatedUser);
    setError("");
    return authenticatedUser;
  }

  // Limpia la sesión local después de cerrarla en Laravel.
  async function logout() {
    await signOut();
    setUser(null);
    setError("");
  }

  // Comparte los datos de sesión con los componentes que los necesitan.
  const auth = { user, loading, error, login, logout };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout auth={auth} />}>
          <Route path="/" element={<Home />} />
          <Route path="/puntos" element={<PuntosRecoleccion />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/manualidades" element={<Manualidades />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/recompensas" element={<Navigate to="/tienda" replace />} />
          <Route path="/conocimiento" element={<Conocimiento />} />
          <Route path="/investigacion" element={<Investigacion />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/reciclaje" element={<Reciclaje />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/comunidad" element={<Navigate to="/chatbot" replace />} />
          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/coleccion" element={<MiColeccion />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>
        </Route>

        <Route path="/Login" element={<Login auth={auth} />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/CompletarRegistro" element={<CompletarRegistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;