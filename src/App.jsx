import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import CompletarRegistro from "./pages/CompletarRegistro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/puntos" element={<PuntosRecoleccion />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/manualidades" element={<Manualidades />} />
          {/* Vistas visuales de los módulos respaldados por recursos de Laravel. */}
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/reciclaje" element={<Reciclaje />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/coleccion" element={<MiColeccion />} />
          <Route path="/comunidad" element={<Comunidad />} />
        </Route>

        {/* El acceso queda fuera de MainLayout para no mostrar Navbar ni Sidebar. */}
        <Route path="/Login" element={<Login />} />
        {/* El formulario de registro también queda separado de la navegación principal. */}
        <Route path="/Registro" element={<Registro />} />
        {/* Segundo paso para que el usuario defina sus credenciales. */}
        <Route path="/CompletarRegistro" element={<CompletarRegistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;