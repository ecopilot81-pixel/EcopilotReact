import { Link } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Eco-Pilot</h1>
        <p>Recicla, aprende y cuida el planeta</p>

        <Link to="/register" className="btn">
          Empezar
        </Link>
      </section>

      {/* OPCIONES */}
      <section className="features">
        <h2>Explora</h2>

        <div className="grid">
          <Link to="/puntos" className="card">
            <h3>Puntos de Recolección</h3>
            <p>Encuentra lugares para reciclar</p>
          </Link>

          <Link to="/emprendimientos" className="card">
            <h3>Emprendimientos</h3>
            <p>Apoya proyectos sostenibles</p>
          </Link>

          <Link to="/manualidades" className="card">
            <h3>Manualidades</h3>
            <p>Aprende a reutilizar</p>
          </Link>

          <Link to="/juego" className="card">
            <h3>Juego</h3>
            <p>Diviértete reciclando</p>
          </Link>
        </div>
      </section>

      {/* CALIFICACIÓN */}
      <section className="rating">
        <h2>Califica la página</h2>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={n <= rating ? "active" : ""}
            >
              ★
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Únete ahora</h2>

        <Link to="/register" className="btn">
          Crear cuenta
        </Link>
      </section>

    </div>
  );
};

export default Home;