import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import Home from "./pages/Home";
import PuntosRecoleccion from "./pages/Puntosrecoleccion";
import Emprendimientos from "./pages/Emprendimientos";
import Manualidades from "./pages/Manualidades";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Las páginas del sitio comparten Navbar, lienzo visual y Footer mediante Main. */}
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/puntos" element={<PuntosRecoleccion />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/manualidades" element={<Manualidades />} />
        </Route>

        {/* La muestra de acceso se mantiene separada del Navbar y el Footer. */}
        <Route element={<Auth />}>
          <Route path="/Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;