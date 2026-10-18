import { Link } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <main className="login-page-container">
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

              {/* El envío sigue deshabilitado hasta implementar el servicio de autenticación. */}
              <button type="button" className="submit-btn" disabled>
                Iniciar sesión
              </button>
            </form>

            <button type="button" className="login-link login-link--disabled" disabled>
              ¿Olvidaste tu contraseña? (recuperación próximamente)
            </button>

            <p className="account-switch">
              {/* El registro tiene su propia página y ruta, separada del formulario de acceso. */}
              ¿No tienes cuenta? <Link className="login-link" to="/Registro">Regístrate aquí</Link>
            </p>

            <p className="login-notice" role="status">
              Esta pantalla es una muestra. El acceso, el registro y la recuperación
              de contraseña aún no están activos.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
