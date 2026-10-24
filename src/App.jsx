import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      {/* Provee estado de sesión compartido a todas las rutas de la aplicación. */}
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
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
            <Route element={<RequireAuth />}>
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/coleccion" element={<MiColeccion />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Route>
          </Route>

          {/* El acceso queda fuera de MainLayout para no mostrar Navbar ni Sidebar. */}
          <Route path="/Login" element={<Login />} />
          {/* El formulario de registro también queda separado de la navegación principal. */}
          <Route path="/Registro" element={<Registro />} />
          {/* Segundo paso para que el usuario defina sus credenciales. */}
          <Route path="/CompletarRegistro" element={<CompletarRegistro />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;