import { Link } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";

export default function Registro() {
  return (
    <>
      <main className="login-page-container">
        <section className="login-card" aria-labelledby="registro-title">
          <Link
            to="/"
            className="login-home-link"
            aria-label="Eco-Pilot, volver al inicio"
          >
            <img src={ecoPilotLogo} alt="Eco-Pilot" />
            <span>Ir al inicio</span>
          </Link>

          <div className="formulario-content">
            <h1 id="registro-title">Crear una cuenta</h1>
            <p className="subtitle">Completa tus datos para registrarte</p>

            {/* required activa la validación nativa para los datos obligatorios; los nombres secundarios son opcionales. */}
            <form>
              <div className="input-group">
                <label htmlFor="registro-primer-nombre">Primer nombre (obligatorio)</label>
                <input
                  id="registro-primer-nombre"
                  name="primerNombre"
                  type="text"
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-segundo-nombre">Segundo nombre (opcional)</label>
                <input
                  id="registro-segundo-nombre"
                  name="segundoNombre"
                  type="text"
                  autoComplete="additional-name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-primer-apellido">Primer apellido (obligatorio)</label>
                <input
                  id="registro-primer-apellido"
                  name="primerApellido"
                  type="text"
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-segundo-apellido">Segundo apellido (opcional)</label>
                <input
                  id="registro-segundo-apellido"
                  name="segundoApellido"
                  type="text"
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-identificacion">Número de identificación (obligatorio)</label>
                <input
                  id="registro-identificacion"
                  name="identificacion"
                  type="text"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-correo">Correo electrónico (obligatorio)</label>
                <input
                  id="registro-correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-celular">Número de celular (obligatorio)</label>
                <input
                  id="registro-celular"
                  name="celular"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              {/* El registro es una maqueta: se puede completar visualmente, pero no enviar sin el servicio. */}
              <button type="button" className="submit-btn" disabled>
                Crear cuenta
              </button>
            </form>

            <p className="account-switch">
              ¿Ya tienes cuenta? <Link className="login-link" to="/Login">Inicia sesión aquí</Link>
            </p>
            <p className="login-notice" role="status">
              El registro aún no está activo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
