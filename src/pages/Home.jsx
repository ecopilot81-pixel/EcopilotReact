import { Link } from "react-router-dom";
import { useState } from "react";
import Carousel from "../components/Carousel";

const Home = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="home">
      {/* Home reutiliza el carrusel compartido como componente. */}
      <Carousel />

      {/* SECCIÓN DE OPCIONES: se mantiene la navegación por temática con cards más visuales. */}
      <section className="features">
        <div className="section-heading">
          <span className="eyebrow eyebrow-dark">Nuestra plataforma</span>
          <h2>Explora nuestra plataforma</h2>
        </div>

        <div className="grid">
          <Link to="/puntos" className="card">
            <div className="card-icon">📍</div>
            <h3>Puntos de Recolección</h3>
            <p>Encuentra los centros de acopio y reciclaje más cercanos a ti.</p>
          </Link>

          <Link to="/tienda" className="card">
            <div className="card-icon">🌱</div>
            <h3>Tienda</h3>
            <p>Apoya y conoce proyectos locales con impacto sostenible.</p>
          </Link>

          <Link to="/manualidades" className="card">
            <div className="card-icon">🎨</div>
            <h3>Manualidades</h3>
            <p>Descubre tutoriales creativos para reutilizar tus residuos.</p>
          </Link>
        </div>
      </section>

      {/* SECCIÓN DE CALIFICACIÓN: se conserva la interacción pero con más estilo y semántica visual. */}
      <section className="rating">
        <div className="section-heading">
          <span className="eyebrow eyebrow-dark">Tu opinión</span>
          <h2>¿Qué te parece Eco-Pilot?</h2>
        </div>
        <p>Tu opinión nos ayuda a seguir mejorando por el planeta.</p>

        <div className="stars" aria-label="Calificación del sitio">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={n <= rating ? "star active" : "star"}
              title={`Calificar con ${n} estrellas`}
              aria-label={`Calificar con ${n} estrellas`}
            >
              ★
            </button>
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