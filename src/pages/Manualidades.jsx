const Manualidades = () => {
  return (
    <div className="manualidades-page">
      <div className="manualidades-container">
        
        <div className="art-icon-container">
          <div className="circle-art-icon">🎨</div>
        </div>

        <header className="manualidades-header">
          <h1>Manualidades y contenido educativo</h1>
        </header>

        {/* Introducción visual de la sección, independiente de los contenidos del backend. */}
        <div className="welcome-banner">
          <p>
            ¡Bienvenido pequeño creador! 🌸 Aquí encontrarás un montón de vídeos súper divertidos, 
            interesantes y creativos que te enseñarán a crear increíbles manualidades reciclando. 
            ¡Aprende jugando mientras cuidas nuestro planeta! 🌍✨
          </p>
        </div>

        {/* Los contenidos se representarán aquí al conectarlos, sin ejemplos inventados. */}
        <div className="visual-empty-state">
          <span aria-hidden="true">♻️</span>
          <h2>Próximamente</h2>
          <p>Los tutoriales y contenidos educativos aparecerán en esta sección.</p>
        </div>
      </div>
    </div>
  );
};

export default Manualidades;