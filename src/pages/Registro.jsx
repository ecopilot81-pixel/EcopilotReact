import { Link, useNavigate } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";

export default function Registro() {
  const navigate = useNavigate();

  // Avanza solo cuando los campos requeridos pasan la validación nativa del navegador.
  function handleSubmit(event) {
    event.preventDefault();
    navigate("/CompletarRegistro");
  }

  return (
    <>
      <main className="login-page-container">
        {/* El enlace agrupa el logo y el texto visible para regresar a la página de inicio. */}
        <Link className="auth-home-link" to="/" aria-label="Ir al inicio">
          <img src={ecoPilotLogo} alt="Eco-Pilot" />
          <span>Ir al inicio</span>
        </Link>
        <section className="login-card" aria-labelledby="registro-title">
          <div className="formulario-content">
            {/* El enlace devuelve al formulario de acceso sin habilitar el envío del registro. */}
            <Link className="register-back-link" to="/Login">
              Atrás
            </Link>
            <h1 id="registro-title">Crear una cuenta</h1>
            <p className="subtitle">Completa tus datos para registrarte</p>

            {/* required valida los datos obligatorios; los nombres secundarios son opcionales. */}
            <form onSubmit={handleSubmit}>
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

              {/* Se exige seleccionar el tipo de documento antes de ingresar su número. */}
              <div className="input-group">
                <label htmlFor="registro-tipo-documento">Tipo de documento (obligatorio)</label>
                <select
                  id="registro-tipo-documento"
                  name="tipoDocumento"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecciona un tipo de documento</option>
                  <option value="tarjeta-identidad">Tarjeta de identidad</option>
                  <option value="cedula">Cédula</option>
                  <option value="cedula-extranjera">Cédula extranjera</option>
                  <option value="permiso-permanencia">Permiso de permanencia</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="registro-identificacion">Número de documento (obligatorio)</label>
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

              {/* Este botón solo avanza al siguiente formulario; no envía los datos a un servidor. */}
              <button type="submit" className="submit-btn">
                Continuar
              </button>
            </form>

            <p className="account-switch">
              ¿Ya tienes cuenta? <Link className="login-link" to="/Login">Inicia sesión aquí</Link>
            </p>
            <p className="login-notice" role="status">
              Después de tus datos personales, podrás definir tu usuario y contraseña.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
