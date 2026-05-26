import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Columna 1: Nombre de la aplicación y Eslogan */}
        <div className="footer-column branding">
          <div className="footer-logo">
            <span className="footer-icon">🌱</span>
            <h2>Eco-Pilot</h2>
          </div>
          <p className="footer-description">
            Se el piloto del planeta. Juntos construimos un futuro más sostenible.
          </p>
        </div>

        {/* Columna 2: Lista del Equipo de Trabajo */}
        <div className="footer-column">
          <h3>Más Sobre Nosotros</h3>
          <ul className="team-list">
            <li>David H.</li>
            <li>Kamila C.</li>
            <li>Alejandro P.</li>
            <li>Manuel R.</li>
            <li>Daniel E.</li>
            <li>Manuel R.</li>
          </ul>
        </div>

        {/* Columna 3: Datos de Contacto */}
        <div className="footer-column">
          <h3>Información de Contacto</h3>
          <div className="contact-email">
            <span className="footer-icon">✉️</span>
            <a href="mailto:ecopilot05@gmail.com">ecopilot05@gmail.com</a>
          </div>
        </div>

      </div>

      {/* Barra Inferior de Créditos Globales */}
      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p className="copyright-text">© 2026 Eco-Pilot. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;