import React from "react";
import "./Manualidades.css";

const Manualidades = () => {
  const proyectos = [
    {
      id: 1,
      titulo: "Crea una Alcancía Divertida",
      emoji: "🐷",
      dificultad: "Fácil",
      tiempo: "30 minutos",
      descripcion: "Transforma una botella de plástico en una alcancía en forma de cerdito. ¡Perfecta para ahorrar mientras cuidas el planeta!",
      materiales: ["1 botella plástica", "Pintura", "Tijeras", "Cutter"] // <-- Definido como "materiales"
    },
    {
      id: 2,
      titulo: "Realiza un Portalápices Colorido",
      emoji: "✏️",
      dificultad: "Fácil",
      tiempo: "45 minutos",
      descripcion: "Convierte latas vacías en organizadores súper coloridos para tus útiles escolares. ¡Personalízalos como más te guste!",
      materiales: ["Latas vacías", "Papel decorativo", "Pegamento", "Tijeras"] // <-- Definido como "materiales"
    }
  ];

  return (
    <div className="manualidades-page">
      <div className="manualidades-container">
        
        <div className="art-icon-container">
          <div className="circle-art-icon">🎨</div>
        </div>

        <header className="manualidades-header">
          <h1>Manualidades para Niños</h1>
        </header>

        <div className="welcome-banner">
          <p>
            ¡Bienvenido pequeño creador! 🌸 Aquí encontrarás un montón de vídeos súper divertidos, 
            interesantes y creativos que te enseñarán a crear increíbles manualidades reciclando. 
            ¡Aprende jugando mientras cuidas nuestro planeta! 🌍✨
          </p>
        </div>

        <main className="cards-grid">
          {proyectos.map((proyecto) => (
            <article key={proyecto.id} className="manualidad-card">
              
              <div className="card-header-green">
                <span className="project-emoji">{proyecto.emoji}</span>
              </div>

              <div className="card-body">
                <h3>{proyecto.titulo}</h3>
                
                <div className="meta-info">
                  <span className="meta-item">⭐ {proyecto.dificultad}</span>
                  <span className="meta-item">⏱️ {proyecto.tiempo}</span>
                </div>

                <p className="project-description">{proyecto.descripcion}</p>

                <div className="materials-section">
                  <h4>Materiales:</h4>
                  <ul>
                    {/* SOLUCIÓN: Cambiado a proyecto.materiales en español para que coincida */}
                    {proyecto.materiales.map((material, index) => (
                      <li key={index}>• {material}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn-tutorial">Ver Tutorial Completo</button>
              </div>

            </article>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Manualidades;