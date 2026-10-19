const Emprendimientos = () => {
  return (
    <div className="emprendimientos">

      <h1>Conoce y Apoya Emprendimientos</h1>
      <p>
        Descubre iniciativas sostenibles en Popayán
      </p>

      {/* El backend todavía no ofrece un recurso de emprendimientos; se indica en vez de simular datos. */}
      <p className="visual-demo-notice">
        Las iniciativas se mostrarán aquí cuando se preparen los datos de esta sección.
      </p>

      {/* Contacto */}
      <div className="contact">
        <h2>¿Tienes un Emprendimiento?</h2>
        <p>Contáctanos para incluirlo</p>

        <a href="mailto:ecopilot05@gmail.com">
          Contáctanos
        </a>
      </div>

    </div>
  );
};

export default Emprendimientos;