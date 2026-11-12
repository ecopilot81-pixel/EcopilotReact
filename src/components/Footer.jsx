import { Link } from "react-router-dom";
import ecopilotLogo from "../assets/ecopilot log.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column branding">
          <div className="footer-logo">
            <img src={ecopilotLogo} alt="" />
            <h2>Eco-Pilot</h2>
          </div>
          <p className="footer-description">
            Se el piloto del planeta. Juntos construimos un futuro más sostenible.
          </p>
        </div>

        <div className="footer-column">
          <h3>Más Sobre Nosotros</h3>
          <Link className="footer-about-link" to="/nosotros">
            Quiénes somos
          </Link>
        </div>

        <div className="footer-column">
          <h3>Información de Contacto</h3>
          <div className="contact-email">
            <span className="footer-icon">✉️</span>
            <a href="mailto:ecopilot05@gmail.com">ecopilot05@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <hr className="footer-divider" />
        {/* El año automático evita tener que actualizar manualmente el copyright. */}
        <p className="copyright-text">
          © {new Date().getFullYear()} Ecopilot. 
          <br/>
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
