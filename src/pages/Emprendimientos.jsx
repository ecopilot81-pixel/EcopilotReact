import "./Emprendimientos.css";

const Emprendimientos = () => {
  const entrepreneurs = [
    {
      id: 1,
      name: "Intera",
      handle: "@interacolombia",
      location: "Sede Popayán",
      description:
        "Empresa dedicada a la transformación de residuos plásticos en nuevos productos sostenibles.",
      image: "🏭",
      website: "https://interacolombia.com",
    },
    {
      id: 2,
      name: "Planta de Transformación de Plástico",
      location: "Sede Norte de Popayán",
      description:
        "Procesamiento y reciclaje de plásticos para reducir contaminación.",
      image: "♻️",
    },
    {
      id: 3,
      name: "Artesanos del Puente del Humilladero",
      location: "Centro de Popayán",
      description:
        "Crean productos únicos con materiales reciclados.",
      image: "🎨",
    },
  ];

  return (
    <div className="emprendimientos">

      <h1>Conoce y Apoya Emprendimientos</h1>
      <p>
        Descubre iniciativas sostenibles en Popayán
      </p>

      {/* Cards */}
      <div className="grid">
        {entrepreneurs.map((e) => (
          <div key={e.id} className="card">

            <div className="card-top">
              <span>{e.image}</span>
            </div>

            <div className="card-body">
              <h3>{e.name}</h3>
              {e.handle && <p className="handle">{e.handle}</p>}

              <p className="location">📍 {e.location}</p>
              <p className="desc">{e.description}</p>

              <div className="buttons">
                <button className="btn-primary">
                  ❤️ Apoyar
                </button>

                {e.website && (
                  <button
                    className="btn-secondary"
                    onClick={() => window.open(e.website)}
                  >
                    🔗
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

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