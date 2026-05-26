import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; 
import Home from "./pages/Home";
import PuntosRecoleccion from "./pages/Puntosrecoleccion"; // <-- Ojo: En tu estructura de archivos está en minúscula la 'r': Puntosrecoleccion
import Emprendimientos from "./pages/Emprendimientos";
import Manualidades from "./pages/Manualidades";
import Login from "./pages/Login";

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer /> 
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/puntos" element={<PuntosRecoleccion />} /> 
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/manualidades" element={<Manualidades />} />
        </Route>

        <Route path="/Login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;