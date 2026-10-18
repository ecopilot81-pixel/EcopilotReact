import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Los estilos base se importan una sola vez y se heredan en todas las rutas.
import './styles/global.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
