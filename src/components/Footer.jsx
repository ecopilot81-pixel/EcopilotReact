const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <section className="footer-social-section" aria-labelledby="footer-about-heading">
          {/* Presenta el título con la tipografía global, encima de los iconos sociales. */}
          <h2 className="footer-section-title" id="footer-about-heading">Sobre nosotros:</h2>
          {/* Enlaza a las páginas principales de las redes mientras no existan perfiles propios. */}
          <nav className="footer-shortcuts" aria-label="Redes sociales">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
              </svg>
            </a>
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
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 9v10M5 5v.1M10 19v-6a3 3 0 0 1 6 0v6M10 10v9M3 3h18v18H3z" />
              </svg>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              title="X"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 4h4.2l9.8 16h-4.2L5 4Zm0 16 6.3-7.1M12.7 11 19 4" />
              </svg>
            </a>
          </nav>
        </section>

        {/* Agrupa los nombres en etiquetas para distinguir y destacar cada autor. */}
        <section className="footer-authors" aria-labelledby="footer-authors-heading">
          <h2 className="footer-section-title" id="footer-authors-heading">Autores:</h2>
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
