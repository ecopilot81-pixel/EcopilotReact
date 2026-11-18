import { Link } from "react-router-dom";
import reciclajeImage from "../assets/img 2.jpg";
import comunidadImage from "../assets/img 4.jpg";
import siembraImage from "../assets/img 5.jpg";

export default function Nosotros() {
  return (
    <div className="visual-page about-page">
      <header className="visual-page__header">
        <span className="visual-eyebrow">Conoce Eco-Pilot</span>
        <h1>¿Quiénes somos?</h1>
        <p>
          Somos una plataforma que conecta a las personas con ideas y recursos para cuidar el
          ambiente desde su comunidad.
        </p>
      </header>

      <section className="about-page__purpose" aria-label="Misión y visión de Eco-Pilot">
        <article className="about-page__purpose-intro">
          <span className="about-page__eyebrow">Nuestro propósito</span>
          <h2>Pequeñas acciones pueden impulsar grandes cambios.</h2>
          <p>
            Eco-Pilot reúne información y herramientas para que adoptar hábitos más sostenibles
            sea más sencillo y cercano.
          </p>
        </article>
        <article className="about-page__purpose-card">
          <span className="about-page__number" aria-hidden="true">01</span>
          <h2>Nuestra misión</h2>
          <p>
            Facilitar el acceso a recursos de reciclaje, aprendizaje e iniciativas locales que
            inspiren a las personas a cuidar su entorno.
          </p>
        </article>
        <article className="about-page__purpose-card">
          <span className="about-page__number" aria-hidden="true">02</span>
          <h2>Nuestra visión</h2>
          <p>
            Construir una comunidad informada y comprometida, donde las decisiones sostenibles
            formen parte de la vida cotidiana.
          </p>
        </article>
      </section>

      <section className="about-page__community" aria-labelledby="about-community-title">
        <div className="about-page__section-heading">
          <span className="about-page__eyebrow">Personas y comunidad</span>
          <h2 id="about-community-title">El cambio empieza cuando lo hacemos en equipo.</h2>
          <p>
            Nos inspira la colaboración: compartir conocimientos, cuidar los espacios comunes y
            convertir buenas ideas en acciones.
          </p>
        </div>
        <div className="about-page__gallery">
          <figure>
            <img src={reciclajeImage} alt="Personas colaborando en la recolección de materiales reciclables" />
            <figcaption>Reciclar y dar nuevos usos a los materiales.</figcaption>
          </figure>
          <figure>
            <img src={comunidadImage} alt="Personas trabajando juntas para plantar un árbol" />
            <figcaption>Sumar esfuerzos para cuidar nuestro entorno.</figcaption>
          </figure>
          <figure>
            <img src={siembraImage} alt="Varias manos sostienen pequeñas plantas" />
            <figcaption>Sembrar hoy un futuro más verde.</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-page__project" aria-labelledby="about-project-title">
        <div>
          <span className="about-page__eyebrow">La plataforma</span>
          <h2 id="about-project-title">Un punto de partida para actuar.</h2>
          <p>
            En Eco-Pilot puedes conocer puntos de recolección, explorar ideas para reutilizar
            materiales y mantenerte al día con noticias e iniciativas ambientales.
          </p>
          <Link className="about-page__link" to="/puntos">Explora Eco-Pilot <span aria-hidden="true">→</span></Link>
        </div>
        <div className="about-page__project-links" aria-label="Explora las secciones de Eco-Pilot">
          <Link to="/puntos"><span aria-hidden="true">⌖</span> Puntos de recolección</Link>
          <Link to="/manualidades"><span aria-hidden="true">✳</span> Ideas para reutilizar</Link>
          <Link to="/noticias"><span aria-hidden="true">↗</span> Noticias ambientales</Link>
        </div>
      </section>
    </div>
  );
}
