import { useState } from "react";

const Emprendimientos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="visual-page emprendimientos">
      <div className="emprendimientos__toolbar">
        <div className="emprendimientos__menu">
          <button
            className="emprendimientos__menu-button"
            type="button"
            aria-expanded={menuAbierto}
            aria-controls="emprendimientos-menu"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            Emprendimientos
            <span className="emprendimientos__menu-arrow" aria-hidden="true">⌄</span>
          </button>
          <div
            className="emprendimientos__menu-dropdown"
            id="emprendimientos-menu"
            hidden={!menuAbierto}
          >
            <a href="mailto:ecopilot05@gmail.com?subject=Publicar%20emprendimiento">
              Publicar emprendimiento
            </a>
          </div>
        </div>
      </div>

      <header className="visual-page__header">
        <span className="visual-eyebrow">Iniciativas sostenibles</span>
        <h1>Tienda Eco-Pilot</h1>
        <p>Conoce y apoya emprendimientos locales con impacto sostenible.</p>
      </header>

      <p className="visual-demo-notice">
        Las iniciativas se mostrarán aquí cuando se preparen los datos de esta sección.
      </p>

      <section className="visual-panel emprendimientos__contact">
        <h2>¿Tienes un emprendimiento?</h2>
        <p>Compártelo con la comunidad Eco-Pilot.</p>
        <a href="mailto:ecopilot05@gmail.com?subject=Publicar%20emprendimiento">
          Publicar emprendimiento
        </a>
      </section>
    </div>
  );
};

export default Emprendimientos;