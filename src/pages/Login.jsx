import { Link } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "./Login.css";

function Login() {
  return (
    <div className="login-page-container">
      <section className="login-card" aria-labelledby="login-title">
        <Link
          to="/"
          className="login-home-link"
          aria-label="Eco-Pilot, volver al inicio"
        >
          <img src={ecoPilotLogo} alt="Eco-Pilot" />
          <span>Ir al inicio</span>
        </Link>
        <div className="formulario-content">
          <h1 id="login-title">Bienvenido a Eco-Pilot</h1>
          <p className="subtitle">Inicia sesión para continuar</p>

          <form>
            <div className="input-group">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                placeholder="Tu contraseña"
                autoComplete="current-password"
              />
            </div>

            <button type="button" className="submit-btn" disabled>
              Iniciar sesión
            </button>
          </form>

          <p className="login-notice" role="status">
            Esta pantalla es una muestra. El inicio de sesión y el registro
            estarán disponibles más adelante.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
