import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";
import { useAuth } from "../context/useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: sessionError } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Envía las credenciales al backend y vuelve al inicio cuando el acceso es válido.
  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      await login({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <main className="login-page-container">
        {/* El enlace agrupa el logo y el texto visible para regresar a la página de inicio. */}
        <Link className="auth-home-link" to="/" aria-label="Ir al inicio">
          <img src={ecoPilotLogo} alt="Eco-Pilot" />
          <span>Ir al inicio</span>
        </Link>
        <section className="login-card" aria-labelledby="login-title">
          <div className="formulario-content">
            <h1 id="login-title">Bienvenido a Eco-Pilot</h1>
            <p className="subtitle">Inicia sesión para continuar</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="login-email">Correo electrónico</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  required
                />
              </div>

              {(error || sessionError) && (
                <p className="auth-error" role="alert">{error || sessionError}</p>
              )}

              {/* Envía el formulario al servicio de autenticación web de Laravel. */}
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
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
              El inicio de sesión está activo. El registro y la recuperación de contraseña
              todavía no están disponibles.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
