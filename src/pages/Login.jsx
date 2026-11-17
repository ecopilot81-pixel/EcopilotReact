import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";

function Login({ auth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: sessionError } = auth;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      // Prioriza los detalles de validación que devuelve Laravel sobre el mensaje genérico de Axios.
      const responseData = loginError.response?.data;
      const validationMessage = Object.values(responseData?.errors || {})
        .flat()
        .find((message) => typeof message === "string" && message.trim());

      setError(
        validationMessage ||
          responseData?.message ||
          (loginError.response?.status === 422
            ? "El servidor rechazó los datos de acceso. Revisa el correo y la contraseña."
            : loginError.message),
      );
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
                <div className="password-input">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-visibility-toggle"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.5 0 9 7 9 7a15.7 15.7 0 01-3.1 3.8M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7c1.1 0 2.1-.3 3-.7" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
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
