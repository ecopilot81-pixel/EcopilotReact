Diagnóstico de Estilos - Proyecto Eco-pilot
1-Inventario y Mapa de Componentes
A continuación se detalla la estructura actual del frontend del proyecto Eco-pilot (EcopilotReact):

Componentes globales (src/components/):

Carousel.jsx

Footer.jsx

Navbar.jsx

NavigationMenu.jsx

RequireAuth.jsx

Vistas y Páginas (src/pages/):

Home.jsx, Login.jsx, Registro.jsx, Perfil.jsx, CompletarRegistro.jsx

Reciclaje.jsx, Puntosrecoleccion.jsx, MiColeccion.jsx, Tienda.jsx

Emprendimientos.jsx, Noticias.jsx, Investigacion.jsx, Conocimiento.jsx, Manualidades.jsx

Ranking.jsx, Chatbot.jsx

Archivos de Estilos (src/styles/):

global.css

carousel.css

login.css

2-Respuestas a las Preguntas del Equipo
1-¿Qué componente de su proyecto tiene el CSS más difícil de mantener? ¿Por qué?
El componente o vista de Login.jsx (junto con Registro.jsx) y Navbar.jsx. Esto se debe a que dependen de archivos CSS globales y específicos (como login.css y global.css). Al tener reglas de estilos sueltas y globales, cualquier cambio en los contenedores o botones corre el riesgo de desconfigurar otras páginas de la aplicación que usen nombres de clases parecidos.

2-El cliente o usuario de su proyecto, ¿qué esperaría ver en un celular?
El usuario esperaría una interfaz 100% responsiva y adaptada a pantallas móviles. Esto incluye un menú de navegación colapsable (tipo hamburguesa), tarjetas de información ordenadas verticalmente, botones táctiles de fácil acceso para las funciones principales (como buscar puntos de recolección o ver la tienda) y un diseño ligero que no requiera desplazamientos horizontales.

3-Si mañana el cliente pide cambiar el color principal, ¿cuántos archivos tendrían que modificar?
Actualmente tendríamos que modificar múltiples archivos de la carpeta src/styles/ (como global.css, login.css y carousel.css) e inclusive revisar componentes que tengan estilos en línea o clases manuales. En caso de migrar a un sistema centralizado o Tailwind, solo se modificaría un único archivo de configuración.

4¿Qué componente migrarían primero a Tailwind como prueba? Justifiquen la elección.
Migraríamos primero el componente Navbar.jsx o Footer.jsx. Se eligen porque son componentes globales que se repiten en casi todas las páginas del proyecto. Migrarlos a Tailwind permite probar el comportamiento responsivo, verificar el aislamiento de estilos y evaluar la agilidad de maquetación en un elemento visible de alto impacto antes de pasar a vistas más complejas.