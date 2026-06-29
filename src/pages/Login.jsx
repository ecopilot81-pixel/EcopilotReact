// Importamos el hook useState para manejar los estados internos del componente
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./Login.css";

function Login() {
  // ESTADO: Guarda qué pestaña está activa ('login' o 'registro'). Por defecto inicia en 'login'.
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  // ESTADOS DE PRUEBA: Guardan en tiempo real lo que el usuario escribe en los campos de texto
  const [email, setEmail] = useState("");     // Guarda el correo electrónico
  const [password, setPassword] = useState(""); // Guarda la contraseña
  const [name, setName] = useState("");         // Guarda el nombre (solo para registro)

  // FUNCIÓN: Se ejecuta cuando el usuario envía el formulario de Inicio de Sesión
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue automáticamente al enviar el formulario
    console.log("=== Datos de Inicio de Sesión ===");
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    if (email === "admin@ecopilot.com" && password === "123456") {
      alert("¡Bienvenido Administrador!");
      
      // Te redirige al inicio de la app, limpiando el historial para que no pueda volver atrás al login
      navigate("/", { replace: true }); 
      
    } else if (email === "empresa@ecopilot.com" && password === "123456") {
      alert("¡Bienvenido Aliado Empresarial!");
      
      // Si tuvieran una ruta específica para empresas, la usarían aquí:
      navigate("/emprendimientos", { replace: true });
      
    } else {
      // Alerta simple por si se equivocan en los datos de prueba
      alert("Credenciales incorrectas. Prueba con: admin@ecopilot.com o empresa@ecopilot.com (Clave: 123456)");
    }
  };

  
  
  // FUNCIÓN: Se ejecuta cuando el usuario envía el formulario de Registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log("=== Datos de Registro ===");
    console.log("Nombre:", name);
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    alert(`Prototipo: Cuenta registrada para ${name}`); // Muestra una alerta de confirmación
  };

  return (
    // Contenedor principal que ocupa toda la pantalla con el fondo verde
    <div className="login-page-container">
      {/* Tarjeta blanca centralizada */}
      <div className="login-card">
        
        {/* SECCIÓN DE PESTAÑAS: Permite cambiar entre Login y Registro */}
        <div className="form-tabs">
          {/* Botón de Iniciar Sesión: Si activeTab es 'login', se le añade la clase CSS 'active' */}
          <button
            type="button"
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`} 
            onClick={() => setActiveTab("login")} // Al hacer clic, cambia el estado a 'login'
          >
            Iniciar Sesión
          </button>
          
          {/* Botón de Registrarte: Si activeTab es 'registro', se le añade la clase CSS 'active' */}
          <button
            type="button"
            className={`tab-btn ${activeTab === "registro" ? "active" : ""}`} 
            onClick={() => setActiveTab("registro")} // Al hacer clic, cambia el estado a 'registro'
          >
            Registrarte
          </button>
        </div>

        {/* CONTENIDO DINÁMICO: Operador ternario de JS que evalúa cuál pestaña está activa */}
        {activeTab === "login" ? (
          
          /*FORMULARIO DE INICIO DE SESIÓN*/
          <div className="formulario-content">
            <h2>Bienvenido de vuelta</h2>
            <p className="subtitle">Ingresa tus credenciales para continuar</p>

            {/* Evento onSubmit: Conecta el formulario con nuestra función de prueba */}
            <form onSubmit={handleLoginSubmit}>
              {/* Bloque para el campo Correo */}
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email} // Vincula el valor del input al estado 'email'
                  onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
                  required // Hace que el campo sea obligatorio
                />
              </div>

              {/* Bloque para el campo Contraseña */}
              <div className="input-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} // Vincula el valor al estado 'password'
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
                  required 
                />
              </div>

              <button type="submit" className="submit-btn">Iniciar Sesión</button>
            </form>
          </div>
          
        ) : (
          
          // FORMULARIO DE REGISTRO */
          <div className="formulario-content">
            <h2>Crea tu cuenta</h2>
            <p className="subtitle">Únete a Eco-Pilot para comenzar</p>

            {/* Evento onSubmit: Conecta el formulario con nuestra función de registro */}
            <form onSubmit={handleRegisterSubmit}>
              {/* Bloque para el Nombre */}
              <div className="input-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  value={name} // Vincula el valor al estado 'name'
                  onChange={(e) => setName(e.target.value)} // Actualiza el estado al escribir
                  required 
                />
              </div>

              {/* Bloque para el Correo del Registro */}
              <div className="input-group">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              {/* Bloque para la Contraseña del Registro */}
              <div className="input-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="submit-btn">Crear Cuenta</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;