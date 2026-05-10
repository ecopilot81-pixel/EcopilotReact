import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import PuntosRecoleccion from "./pages/PuntosRecoleccion"; 
import Emprendimientos from "./pages/Emprendimientos";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puntos" element={<PuntosRecoleccion />} /> 
        <Route path="/emprendimientos" element={<Emprendimientos />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;