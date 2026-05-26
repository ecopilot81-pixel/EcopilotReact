import { Link } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Eco-Pilot</h1>
          <p>Tu guía interactiva para reciclar, aprender y cuidar el planeta juntos.</p>
          <Link to="/Login" className="btn">
          Inicia tu viaje
          </Link>
        </div>
      </section>

      {/* SECCIÓN DE OPCIONES */}
      <section className="features">
        <h2>Explora nuestra plataforma</h2>
        
        <div className="grid">
          <Link to="/puntos" className="card">
            <div className="card-icon">📍</div>
            <h3>Puntos de Recolección</h3>
            <p>Encuentra los centros de acopio y reciclaje más cercanos a ti.</p>
          </Link>

          <Link to="/emprendimientos" className="card">
            <div className="card-icon">🌱</div>
            <h3>Emprendimientos</h3>
            <p>Apoya y conoce proyectos locales con impacto sostenible.</p>
          </Link>

          {/* Ajustado a "/Manualidades" con mayúscula para que coincida con tu Navbar */}
          <Link to="/Manualidades" className="card">
            <div className="card-icon">🎨</div>
            <h3>Manualidades</h3>
            <p>Descubre tutoriales creativos para reutilizar tus residuos.</p>
          </Link>
        </div>
      </section>

      {/* SECCIÓN DE CALIFICACIÓN */}
      <section className="rating">
        <h2>¿Qué te parece Eco-Pilot?</h2>
        <p>Tu opinión nos ayuda a seguir mejorando por el planeta.</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={n <= rating ? "star active" : "star"}
              title={`Calificar con ${n} estrellas`}
            >
              ★
            </span>
          ))}
        </div>
        {rating > 0 && (
          <p className="rating-thanks">¡Gracias por calificarnos con {rating} estrellas! ✨</p>
        )}
      </section>

    </div>
  );
};

export default Home;