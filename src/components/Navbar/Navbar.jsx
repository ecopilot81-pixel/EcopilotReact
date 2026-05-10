import { Link } from "react-router-dom";
import "./Navbar.css";
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>Eco-Pilot</span>
      </div>
      
      <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/puntos">Puntos de Recolección</Link></li> {/* ✔ */}
          <li><Link to="/emprendimientos">Emprendimientos</Link></li>
        </ul>

    </nav>
  )
}
export default Navbar