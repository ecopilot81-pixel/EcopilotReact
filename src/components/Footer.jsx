import ecopilotLogo from "../assets/ecopilot log.png";

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <section className="footer-column branding" aria-label="Eco-Pilot">
        <div className="footer-logo">
          <img src={ecopilotLogo} alt="" />
          <h2>Eco-Pilot</h2>
        </div>
        <p className="footer-description">
          Sé el piloto del planeta. Juntos construimos un futuro más sostenible.
        </p>
      </section>

      <section className="footer-social-section" aria-labelledby="footer-social-heading">
        <h2 className="footer-section-title" id="footer-social-heading">
          Síguenos en:
        </h2>
        <nav className="footer-shortcuts" aria-label="Redes sociales">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" className="footer-icon-fill" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg className="footer-icon-facebook" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
            </svg>
          </a>
        </nav>
        <div className="footer-contact" aria-labelledby="footer-contact-heading">
          <h2 className="footer-section-title" id="footer-contact-heading">Contáctanos:</h2>
          <a className="contact-email" href="mailto:ecopilot05@gmail.com">
            ecopilot05@gmail.com
          </a>
        </div>
      </section>

      <section className="footer-authors" aria-labelledby="footer-authors-heading">
        <h2 className="footer-section-title" id="footer-authors-heading">
          Autores:
        </h2>
        <ul className="footer-author-list">
          <li>David</li>
          <li>Manuel</li>
          <li>Daniel</li>
          <li>Kamila</li>
          <li>Alejandro</li>
        </ul>
      </section>
    </div>

    <div className="footer-bottom">
      <hr className="footer-divider" />
      <p className="copyright-text">
        © {new Date().getFullYear()} Ecopilot.
        <br />
        Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
