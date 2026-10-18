import { useEffect, useState } from "react";
import imageOne from "../assets/img 1.jpg";
import imageTwo from "../assets/img 2.jpg";
import imageThree from "../assets/img 3.jpg";
import imageFour from "../assets/img 4.jpg";
import imageFive from "../assets/img 5.jpg";
import "../styles/carousel.css";

// El componente de carrusel reúne las imágenes del proyecto y sus mensajes.
const slides = [
  {
    image: imageOne,
    title: "Recicla con intención",
    text: "Encuentra puntos de recolección y hábitos sostenibles en tu comunidad.",
  },
  {
    image: imageTwo,
    title: "Apoya emprendimientos verdes",
    text: "Descubre negocios locales que impulsan soluciones ambientales reales.",
  },
  {
    image: imageThree,
    title: "Haz manualidades con propósito",
    text: "Transforma residuos en ideas creativas y útiles para el hogar.",
  },
  {
    image: imageFour,
    title: "Tu planeta, tu misión",
    text: "Cada acción suma. Aprende, comparte y contribuye al cambio.",
  },
  {
    image: imageFive,
    title: "Pequeñas acciones, gran impacto",
    text: "Súmate a una comunidad que transforma sus hábitos para cuidar el planeta.",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reinicia la espera al cambiar de slide, también cuando el cambio es manual.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  // Permite recorrer las imágenes manualmente desde los controles laterales.
  const showSlide = (direction) => {
    setCurrentSlide(
      (previousSlide) => (previousSlide + direction + slides.length) % slides.length,
    );
  };

  return (
    <section className="hero" aria-label="Descubre Eco-Pilot">
      <div className="hero-slider">
        <button
          type="button"
          className="slider-arrow slider-arrow--previous"
          onClick={() => showSlide(-1)}
          aria-label="Mostrar imagen anterior"
        >
          &#8249;
        </button>
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            aria-hidden={index !== currentSlide}
          >
            {/* El img usa el asset importado para que Vite resuelva la ruta en producción. */}
            <img className="hero-image" src={slide.image} alt="" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="eyebrow">Eco-Pilot</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="slider-arrow slider-arrow--next"
          onClick={() => showSlide(1)}
          aria-label="Mostrar imagen siguiente"
        >
          &#8250;
        </button>
      </div>

      {/* Los controles permiten seleccionar manualmente cada imagen del carrusel. */}
      <div className="slider-dots" role="group" aria-label="Diapositivas del carrusel">
        {slides.map((slide, index) => (
          <button
            key={`${slide.title}-dot`}
            type="button"
            className={index === currentSlide ? "dot active" : "dot"}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Mostrar diapositiva ${index + 1}: ${slide.title}`}
            aria-pressed={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
