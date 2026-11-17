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
            Sé el piloto del planeta. Juntos construimos un futuro sostenible.
          </p>
        </div>

        <div className="footer-column">
          <h3>Más Sobre Nosotros</h3>
          <Link className="footer-about-link" to="/nosotros">
            Quiénes somos
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;