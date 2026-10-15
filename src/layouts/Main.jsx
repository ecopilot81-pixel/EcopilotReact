import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Main.css";

const Main = () => {
  return (
    <div className="main">
      {/* Encabezado compartido: contiene la navegación principal de la aplicación. */}
      <header>
        <Navbar />
      </header>

      {/* React Router renderiza aquí la página hija de la ruta activa. */}
      <main className="main__content">
        <Outlet />
      </main>

      {/* Pie compartido para las páginas que usan este layout. */}
      <Footer />
    </div>
  );
};

export default Main;
