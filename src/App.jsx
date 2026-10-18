import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Main";
import Home from "./pages/Home";
import PuntosRecoleccion from "./pages/Puntosrecoleccion";
import Emprendimientos from "./pages/Emprendimientos";
import Manualidades from "./pages/Manualidades";
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