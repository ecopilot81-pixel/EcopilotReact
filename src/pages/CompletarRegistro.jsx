import { Link } from "react-router-dom";
import ecoPilotLogo from "../assets/ecopilot log.png";
import "../styles/login.css";
import Footer from "../components/Footer";

export default function CompletarRegistro() {
  return (
    <>
      <main className="login-page-container">
        {/* Conserva el acceso al inicio durante el paso de creación de credenciales. */}
        
        <Link className="auth-home-link" to="/" aria-label="Ir al inicio">
          <img src={ecoPilotLogo} alt="Eco-Pilot" />
          <span>Ir al inicio</span>
        </Link>
        
        <section className="login-card" aria-labelledby="credenciales-title">
          <div className="formulario-content">
            {/* Permite volver a corregir los datos personales del paso anterior. */}
            <Link className="register-back-link" to="/Registro">
              Atrás
            </Link>
            <h1 id="credenciales-title">Crea tu usuario y contraseña</h1>
            <p className="subtitle">Define las credenciales de tu cuenta</p>

            {/* El patrón exige al menos ocho caracteres: mayúscula, minúscula, número y símbolo. */}
            <form>
              <div className="input-group">
                <label htmlFor="registro-usuario">Nombre de usuario (obligatorio)</label>
                <input
                  id="registro-usuario"
                  name="usuario"
                  type="text"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="registro-contrasena">Contraseña (obligatoria)</label>
                <input
                  id="registro-contrasena"
                  name="contrasena"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
                  title="Usa mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo."
                  required
                />
                <small className="password-hint">
                  Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
                </small>
              </div>

              {/* La pantalla es una maqueta; no simula guardar una cuenta sin el servicio de registro. */}
              <button type="button" className="submit-btn" disabled>
                Finalizar 
              </button>
            </form>

            <p className="login-notice" role="status">
              El registro todavía no guarda los datos porque el servicio no está activo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
